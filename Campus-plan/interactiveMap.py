import json  # Behalten für potenzielle JSON-Ausgabe, auch wenn nicht direkt für HTML
from datetime import date
import holidays  # type: ignore


class StundenplanManager:
    def __init__(self, stundenplan_rohdaten, campus_gebaeude_definitionen, feiertag_bundesland='NW',
                 hochschule_hauptstandort_details=None, campus_map_image_url=None):
        """
        Initialisiert den StundenplanManager.
        """
        self.campus_gebaeude = campus_gebaeude_definitionen
        self.feiertag_bundesland = feiertag_bundesland
        self.feiertage_instanz = holidays.DE(prov=self.feiertag_bundesland)
        self.campus_map_image_url = campus_map_image_url or "bilder/karte-campus-kamp-linfort-2.5-de.png"

        self.hochschule_hauptstandort_details = hochschule_hauptstandort_details or self.campus_gebaeude.get(
            "campus_mitte", {"name": "Hochschule Rhein-Waal, Kamp-Lintfort - Standardansicht", "sceneId": "campusmitte",
                             "panorama": "bilder/Campusmitte_IMG_20231023_103219_00_124-1.jpg",
                             "targetYaw": 0, "targetPitch": 0, "targetHfov": 100, "funktion": "Übersicht",
                             "map_x_percent": "40.26",
                             "map_y_percent": "46.87"})

        self.stundenplan = self._verarbeite_stundenplan_eintraege(stundenplan_rohdaten)

    def _parse_raum_detail(self, raum_string_original):
        if not isinstance(raum_string_original, str):
            return {"typ": "fehler", "hinweis": "Kein String übergeben", "original": raum_string_original}

        raum_string_lower = raum_string_original.strip().lower()

        if raum_string_lower == "digital/online":
            return {"typ": "online", "gebaeude_id_raw": "online", "stock_raw": "N/A", "raum_nr_raw": "N/A",
                    "original": raum_string_original}
        if raum_string_lower == "tba":
            return {"typ": "tba", "gebaeude_id_raw": "tba", "stock_raw": "N/A", "raum_nr_raw": "N/A",
                    "original": raum_string_original}

        cleaned_raum_string = raum_string_lower.replace(" ", "")
        if cleaned_raum_string.isdigit() and len(cleaned_raum_string) == 7:
            return {"typ": "numerisch_gsr", "gebaeude_id_raw": cleaned_raum_string[0:2],
                    "stock_raw": cleaned_raum_string[2:4], "raum_nr_raw": cleaned_raum_string[4:7],
                    "original": raum_string_original}

        teile = raum_string_original.split(',')
        if len(teile) == 3:
            return {"typ": "komma_separiert", "gebaeude_id_raw": teile[0].strip(), "stock_raw": teile[1].strip(),
                    "raum_nr_raw": teile[2].strip(), "original": raum_string_original}

        return {"typ": "unbekannt", "hinweis": f"Format nicht erkannt: {raum_string_original}",
                "original": raum_string_original}

    def _find_gebaeude_fuer_raum(self, raum_name_original):
        parsed_detail = self._parse_raum_detail(raum_name_original)
        target_scene_key = None

        if raum_name_original in self.campus_gebaeude:
            target_scene_key = raum_name_original
        elif isinstance(raum_name_original, str) and raum_name_original.lower() in self.campus_gebaeude:
            target_scene_key = raum_name_original.lower()

        if not target_scene_key and parsed_detail and parsed_detail.get("gebaeude_id_raw"):
            raw_id = parsed_detail.get("gebaeude_id_raw", "").lower()

            if parsed_detail.get("typ") in ["online", "tba"]:
                pass
            elif "01" in raw_id:
                target_scene_key = "01_hoersaalzentrum"
            elif "02" in raw_id:
                target_scene_key = "02_bibliothek_usability"
            elif "03" in raw_id:
                target_scene_key = "03_fakultaet_fablab_ais"
            elif "04" in raw_id:
                target_scene_key = "04_verwaltung_mensa"
            elif "08" in raw_id:
                target_scene_key = "08_greenfablab_aussen"

        if isinstance(raum_name_original, str):
            raum_name_lower_fuer_keywords = raum_name_original.lower()
            temp_target_scene_key_p3 = None
            if "hörsaal" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "01_hoersaalzentrum"
            elif "pc-pool" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "02_bibliothek_usability"
            elif "usability" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "usabilitylabor_innen"
            elif "fablab" in raum_name_lower_fuer_keywords and not "green" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "fablab_eingang"
            elif "ais" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "ais_labor_1"
            elif "green fablab" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "08_greenfablab_innen"
            elif "mensa" in raum_name_lower_fuer_keywords:
                temp_target_scene_key_p3 = "04_verwaltung_mensa"

            if temp_target_scene_key_p3 and temp_target_scene_key_p3 in self.campus_gebaeude:
                target_scene_key = temp_target_scene_key_p3

        if target_scene_key and target_scene_key in self.campus_gebaeude:
            scene_data = self.campus_gebaeude[target_scene_key]
            return {**scene_data, "ursprungsraum": raum_name_original, "detail": parsed_detail}

        fallback_name = self.hochschule_hauptstandort_details.get('name', 'Campus Übersicht')
        map_x = self.hochschule_hauptstandort_details.get('map_x_percent', '50')
        map_y = self.hochschule_hauptstandort_details.get('map_y_percent', '50')

        if parsed_detail.get("typ") == "online":
            fallback_name = "Online Veranstaltung - Keine spezifische Campus-Ansicht"
            map_x, map_y = None, None
        elif parsed_detail.get("typ") == "tba":
            fallback_name = "Raum TBA - Keine spezifische Campus-Ansicht"
            map_x, map_y = None, None
        elif raum_name_original:  # Nur den Namen anfügen, wenn es einen Ursprungsraum gab
            fallback_name = f"{fallback_name} (Fallback für '{raum_name_original}')"

        return {**self.hochschule_hauptstandort_details, "name": fallback_name, "ursprungsraum": raum_name_original,
                "detail": parsed_detail, "map_x_percent": map_x, "map_y_percent": map_y}

    def _verarbeite_stundenplan_eintraege(self, stundenplan_rohdaten):
        verarbeiteter_plan = []
        for eintrag in stundenplan_rohdaten:
            neuer_eintrag = eintrag.copy()
            raum_info_original = neuer_eintrag.get("raum")
            neuer_eintrag["gebaeude_details"] = self._find_gebaeude_fuer_raum(raum_info_original)
            verarbeiteter_plan.append(neuer_eintrag)
        return verarbeiteter_plan

    def ist_feiertag(self, zu_pruefendes_datum):
        if isinstance(zu_pruefendes_datum, str):
            try:
                zu_pruefendes_datum = date.fromisoformat(zu_pruefendes_datum)
            except ValueError:
                # print(f"Warnung: Ungültiges Datumsformat für Feiertagsprüfung: {zu_pruefendes_datum}") # Für Backend ggf. Logging statt print
                return False  # Im Backend sollte dies ggf. einen Fehler werfen oder anders behandelt werden
        return zu_pruefendes_datum in self.feiertage_instanz

    def get_termine_fuer_tag(self, datum_isoformat):
        try:
            target_datum = date.fromisoformat(datum_isoformat)
        except ValueError:
            # print(f"Fehler: Ungültiges Datumsformat für Terminabfrage: {datum_isoformat}") # Für Backend ggf. Logging
            return []  # Im Backend ggf. Fehler werfen

        if self.ist_feiertag(target_datum):
            return []

        tag_name_map = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
        tag_name = tag_name_map[target_datum.weekday()]

        tages_termine = [termin for termin in self.stundenplan if termin.get("tag", "").lower() == tag_name.lower()]
        return tages_termine

    def generiere_daten_fuer_3d_ansicht(self, termin_daten):
        """
        Generiert die notwendigen Daten für eine 3D-Ansicht eines Termins
        oder eine Standardansicht, wenn keine Termindaten vorhanden sind.
        Gibt ein Dictionary mit allen relevanten Daten zurück.
        """
        current_map_pointer_data = None
        event_info_for_display = {}

        if not termin_daten or not termin_daten.get("gebaeude_details"):
            details_fuer_ansicht = self.hochschule_hauptstandort_details
            title_text = details_fuer_ansicht.get("name", "Campus Übersicht")
            event_info_for_display = {
                "veranstaltung": "N/A - Standardansicht",
                "raum_name": details_fuer_ansicht.get("name", "Campus Übersicht"),
                "ursprungsraum": "N/A",
                "start_zeit": "N/A",
                "end_zeit": "N/A"
            }
            if details_fuer_ansicht.get("map_x_percent") is not None and details_fuer_ansicht.get(
                    "map_y_percent") is not None:
                current_map_pointer_data = {
                    "id": "current_event_pointer",
                    "x": details_fuer_ansicht.get("map_x_percent"),
                    "y": details_fuer_ansicht.get("map_y_percent"),
                    "label": title_text,
                    "sceneId": details_fuer_ansicht.get("sceneId"),
                    "isCurrent": True
                }
        else:
            details_fuer_ansicht = termin_daten["gebaeude_details"]
            parsed_info = details_fuer_ansicht.get("detail", {})
            raum_display_name = parsed_info.get("original", details_fuer_ansicht.get("ursprungsraum", "N/A"))

            if parsed_info.get("typ") == "numerisch_gsr":
                raum_display_name = f"G{parsed_info.get('gebaeude_id_raw')}-S{parsed_info.get('stock_raw')}-R{parsed_info.get('raum_nr_raw')}"
            elif parsed_info.get("typ") == "online":
                raum_display_name = "Online"
            elif parsed_info.get("typ") == "tba":
                raum_display_name = "TBA"

            title_text = f"{termin_daten.get('veranstaltung', 'Termin')} - {raum_display_name}"
            event_info_for_display = {
                "veranstaltung": termin_daten.get('veranstaltung', 'N/A'),
                "raum_name": details_fuer_ansicht.get('name', 'N/A'),
                "ursprungsraum": details_fuer_ansicht.get('ursprungsraum', 'N/A'),
                "start_zeit": termin_daten.get('start_zeit', ''),
                "end_zeit": termin_daten.get('end_zeit', '')
            }

            if details_fuer_ansicht.get("map_x_percent") is not None and details_fuer_ansicht.get(
                    "map_y_percent") is not None:
                current_map_pointer_data = {
                    "id": "current_event_pointer",
                    "x": details_fuer_ansicht.get("map_x_percent"),
                    "y": details_fuer_ansicht.get("map_y_percent"),
                    "label": title_text,
                    "sceneId": details_fuer_ansicht.get("sceneId"),
                    "isCurrent": True
                }

        initial_scene_id = details_fuer_ansicht.get("sceneId",
                                                    self.hochschule_hauptstandort_details.get("sceneId", "campusmitte"))
        initial_yaw = details_fuer_ansicht.get("targetYaw", self.hochschule_hauptstandort_details.get("targetYaw", 0))
        initial_pitch = details_fuer_ansicht.get("targetPitch",
                                                 self.hochschule_hauptstandort_details.get("targetPitch", 0))
        initial_hfov = details_fuer_ansicht.get("targetHfov",
                                                self.hochschule_hauptstandort_details.get("targetHfov", 100))

        all_scenes_data_dict = {}
        for key, scene_info_val in self.campus_gebaeude.items():
            all_scenes_data_dict[scene_info_val.get('sceneId', key)] = {
                "title": scene_info_val.get('name', ''),
                "hfov": scene_info_val.get('targetHfov', 110),
                "pitch": scene_info_val.get('targetPitch', 0),
                "yaw": scene_info_val.get('targetYaw', 0),
                "type": "equirectangular",  # Standardmäßig, kann bei Bedarf angepasst werden
                "panorama": scene_info_val.get("panorama", ""),  # Lokaler Pfad bleibt bestehen
                "hotSpots": []  # Hotspots müssten hier oder im Frontend definiert werden
            }

        all_map_pointers_list = []
        for scene_id_key, scene_data_val in self.campus_gebaeude.items():
            if scene_data_val.get("map_x_percent") is not None and scene_data_val.get("map_y_percent") is not None:
                pointer_data = {
                    "id": scene_data_val.get("sceneId", scene_id_key) + "_map_pointer",
                    "x": scene_data_val.get("map_x_percent"),
                    "y": scene_data_val.get("map_y_percent"),
                    "label": scene_data_val.get("name", scene_id_key),
                    "sceneId": scene_data_val.get("sceneId", scene_id_key),
                    "isCurrent": False  # Wird im Frontend ggf. überschrieben/gesetzt
                }
                all_map_pointers_list.append(pointer_data)

        # Logik um Duplikate bei current pointer zu vermeiden, falls dieser auch in all_map_pointers_list ist
        if current_map_pointer_data:
            all_map_pointers_list = [
                p for p in all_map_pointers_list
                if not (p.get("sceneId") == current_map_pointer_data.get("sceneId") and
                        p.get("x") == current_map_pointer_data.get("x") and
                        p.get("y") == current_map_pointer_data.get("y"))
            ]

        return {
            "viewer_config": {
                "default": {
                    "firstScene": initial_scene_id,
                    "sceneFadeDuration": 1000,  # Beispielwert
                    "hfov": initial_hfov,
                    "yaw": initial_yaw,
                    "pitch": initial_pitch
                },
                "scenes": all_scenes_data_dict,
                "autoLoad": True,  # Beispielwert
                "showControls": True,  # Beispielwert
                "orientationOnByDefault": False,  # Beispielwert
                "draggable": True,  # Beispielwert
                "mouseZoom": True,  # Beispielwert
                "compass": True  # Beispielwert
            },
            "map_data": {
                "map_image_url": self.campus_map_image_url,
                "pointers": all_map_pointers_list,
                "current_event_pointer": current_map_pointer_data
            },
            "event_details": event_info_for_display,
            "page_title": f"Campus Navigator: {title_text}"
        }

    def get_ansicht_daten_fuer_termine(self, termine):
        """
        Wählt den ersten Termin (falls vorhanden) für die Detailansicht
        oder generiert Daten für eine Standard-Campus-Übersicht.
        """
        if not termine:
            # print("Keine Termine zum Anzeigen. Generiere Daten für Standard-Campus-Ansicht.") # Logging
            return self.generiere_daten_fuer_3d_ansicht({})  # Leeres dict für Standardansicht

        erster_termin = termine[0]
        return self.generiere_daten_fuer_3d_ansicht(erster_termin)


# --- ANGEPASSTE Definition der Campus-Gebäude für 3D-Integration ---
campus_gebaeude_info_hrw_kal_3d = {
    "campus_mitte": {"name": "Campus Mitte", "funktion": "Zentraler Campusbereich", "sceneId": "campusmitte",
                     "panorama": "bilder/Campusmitte_IMG_20231023_103219_00_124-1.jpg", "targetYaw": -94,
                     "targetPitch": 0,
                     "targetHfov": 100, "map_x_percent": "40.26", "map_y_percent": "46.87"},
    "01_hoersaalzentrum": {"name": "Gebäude 01 - Hörsaalzentrum", "funktion": "Hörsaalzentrum",
                           "sceneId": "haus1eingang", "panorama": "bilder/01-Eingang_IMG_20231023_103432_00_127-1.jpg",
                           "targetYaw": 39,
                           "targetPitch": 0, "targetHfov": 100, "map_x_percent": "43.67", "map_y_percent": "35.62"},
    "02_bibliothek_usability": {"name": "Gebäude 02 - Bibliothek / Usabilitylabor",
                                "funktion": "Bibliothek / Usability Labor", "sceneId": "haus2eingang",
                                "panorama": "bilder/01-Eingang-aussen_IMG_20231023_095048_00_083-1.jpg",
                                "targetYaw": 103, "targetPitch": 0,
                                "targetHfov": 100, "map_x_percent": "52.08", "map_y_percent": "44.37"},
    "usabilitylabor_innen": {"name": "Gebäude 02 - Usabilitylabor Innenansicht", "funktion": "Usability Labor Innen",
                             "sceneId": "haus2linksusabilitylab",
                             "panorama": "bilder/07_l-2.-OG-Usability-Lab_IMG_20231023_101628_00_105.jpg",
                             "targetYaw": 141, "targetPitch": -9, "targetHfov": 100, "map_x_percent": "51.88",
                             "map_y_percent": "44.37"},
    "03_fakultaet_fablab_ais": {"name": "Gebäude 03 - FabLab / AIS Lab", "funktion": "Fakultätsgebäude",
                                "sceneId": "haus3eingang",
                                "panorama": "bilder/01-Eingang_IMG_20231023_104134_00_130.jpg", "targetYaw": -43,
                                "targetPitch": 0, "targetHfov": 100, "map_x_percent": "45.0", "map_y_percent": "60.0"
                                },
    "fablab_eingang": {"name": "FabLab Eingangsbereich", "funktion": "FabLab Innen", "sceneId": "FabLabEingang",
                       "panorama": "bilder/03_u-FabLab_GS__0079-1.jpg", "targetYaw": -137, "targetPitch": -7,
                       "targetHfov": 100,
                       "map_x_percent": "44.67", "map_y_percent": "56.56"},
    "ais_labor_1": {"name": "AIS Labor", "funktion": "AIS Labor Innen", "sceneId": "AISLabor1",
                    "panorama": "bilder/06_o-AIS-Labor_IMG_20231023_100343_00_096.jpg", "targetYaw": -28,
                    "targetPitch": -1,
                    "targetHfov": 100, "map_x_percent": "46.27", "map_y_percent": "65.62"},
    "04_verwaltung_mensa": {"name": "Gebäude 04 - Verwaltung / Mensa", "funktion": "Verwaltung / Administration",
                            "sceneId": "haus4eingang", "panorama": "bilder/01-Eingang_IMG_20231023_103526_00_128.jpg",
                            "targetYaw": -53,
                            "targetPitch": 0, "targetHfov": 100, "map_x_percent": "28.84", "map_y_percent": "42.81"},
    "08_greenfablab_aussen": {"name": "Gebäude 08 - Green FabLab Aussen", "funktion": "Green FabLab",
                              "sceneId": "GFL07",
                              "panorama": "bilder/07-Eingang-Green-FabLab_IMG_20231023_105842_00_148.jpg",
                              "targetYaw": -134, "targetPitch": -10, "targetHfov": 100, "map_x_percent": "83.0",
                              "map_y_percent": "80.0"
                              },
    "08_greenfablab_innen": {"name": "Gebäude 08 - Green FabLab Innen", "funktion": "Green FabLab Innenansicht",
                             "sceneId": "GFL08", "panorama": "bilder/08-Green-FabLab_GS__0084.jpg", "targetYaw": 11,
                             "targetPitch": 0,
                             "targetHfov": 100, "map_x_percent": "83.93", "map_y_percent": "81.56"},
    "Hörsaal 6": {"sceneId": "haus1eingang", "name": "Hörsaal 6 (Gebäude 01)", "funktion": "Hörsaal",
                  "panorama": "bilder/01-Eingang_IMG_20231023_103432_00_127-1.jpg", "targetYaw": 40, "targetPitch": -2,
                  "targetHfov": 100, "map_x_percent": "43.67", "map_y_percent": "35.62"},
    "PC-Pool 3": {"sceneId": "haus2eingang", "name": "PC-Pool 3 (Gebäude 02)", "funktion": "PC-Pool",
                  "panorama": "bilder/01-Eingang-aussen_IMG_20231023_095048_00_083-1.jpg", "targetYaw": 103,
                  "targetPitch": -1, "targetHfov": 100, "map_x_percent": "52.08", "map_y_percent": "44.37"},
    "Softwarelabor": {"sceneId": "FabLabEingang", "name": "Softwarelabor (im FabLab)", "funktion": "Softwarelabor",
                      "panorama": "bilder/03_u-FabLab_GS__0079-1.jpg", "targetYaw": -137, "targetPitch": -7,
                      "targetHfov": 100, "map_x_percent": "44.67", "map_y_percent": "56.56"},
}

stundenplan_beispiel_daten = [
    {"tag": "Montag", "start_zeit": "10:00", "end_zeit": "11:30", "veranstaltung": "Lineare Algebra", "raum": "0102130",
     "dozent": "Prof. Zimmer"},
    {"tag": "Montag", "start_zeit": "12:15", "end_zeit": "13:45", "veranstaltung": "Fortgeschrittene Programmierung G6",
     "raum": "0201535", "dozent": "Hr. Schmidl"},
    {"tag": "Donnerstag", "start_zeit": "08:15", "end_zeit": "09:45",
     "veranstaltung": "Algorithmen und Datenstrukturen",
     "raum": "PC-Pool 3", "dozent": "Prof. Siebenlist"},
    {"tag": "Freitag", "start_zeit": "10:00", "end_zeit": "15:30", "veranstaltung": "Medienkonzeption und -gestaltung",
     "raum": "Softwarelabor", "dozent": "Fr. Bierwolf"},
]

if __name__ == "__main__":
    manager = StundenplanManager(
        stundenplan_rohdaten=stundenplan_beispiel_daten,
        campus_gebaeude_definitionen=campus_gebaeude_info_hrw_kal_3d,
        campus_map_image_url="bilder/karte-campus-kamp-linfort-2.5-de.png"
    )

    heute_iso = "2025-05-12"  # Montag
    print(f"\n--- Abfrage für Backend-Daten am {heute_iso} ---")
    termine_heute = manager.get_termine_fuer_tag(heute_iso)

    if termine_heute:
        print(f"Termine für {heute_iso} gefunden:")
        for t_idx, t in enumerate(termine_heute):
            details = t.get("gebaeude_details", {})
            parsed_room_info = details.get('detail', {})
            raum_beschreibung = details.get('ursprungsraum', 'N/A')
            # ... (Restliche Logik zur Raumbeschreibung bleibt gleich für die Konsolenausgabe)
            print(
                f"  - {t['start_zeit']}-{t['end_zeit']}: {t['veranstaltung']} in '{details.get('name', 'Unbekannt')}' (Ort: {raum_beschreibung}, Szene-ID: {details.get('sceneId', 'N/A')})")

        # Generiere Daten für den ersten Termin des Tages
        backend_daten = manager.get_ansicht_daten_fuer_termine(termine_heute)
        print("\nBackend-Daten für den ersten Termin:")
        # print(json.dumps(backend_daten, indent=4, ensure_ascii=False)) # Für eine schönere Ausgabe der Datenstruktur
    else:
        print(f"Keine Termine für {heute_iso} oder es ist ein Feiertag. Generiere Daten für Standard-Campus-Ansicht.")
        backend_daten = manager.get_ansicht_daten_fuer_termine([])
        print("\nBackend-Daten für Standardansicht:")
        # print(json.dumps(backend_daten, indent=4, ensure_ascii=False))

    # Beispiel: Zugriff auf einige der generierten Daten
    if backend_daten:
        print(f"\nPage Title: {backend_daten.get('page_title')}")
        print(f"Initial Scene ID: {backend_daten.get('viewer_config', {}).get('default', {}).get('firstScene')}")
        print(f"Map Image URL: {backend_daten.get('map_data', {}).get('map_image_url')}")
        if backend_daten.get('map_data', {}).get('current_event_pointer'):
            print(
                f"Current Event Pointer Label: {backend_daten.get('map_data', {}).get('current_event_pointer', {}).get('label')}")
        print(f"Anzahl Szenen: {len(backend_daten.get('viewer_config', {}).get('scenes', {}))}")
        print(f"Anzahl Map Pointer (ohne aktuellen): {len(backend_daten.get('map_data', {}).get('pointers', []))}")
        print(f"Event Info: {backend_daten.get('event_details')}")