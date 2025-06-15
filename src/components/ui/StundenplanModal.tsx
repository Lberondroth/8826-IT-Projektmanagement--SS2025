import React from "react";

interface StundenplanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StundenplanModal: React.FC<StundenplanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Medieninformatik SoSe 2025 2. Semester
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            aria-label="Schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Montag */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">Montag</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 11:30</div>
                <div className="col-span-2">8825 Lineare Algebra und Operations Research</div>
                <div className="text-center">V</div>
                <div>Prof. Dr. Zimmer</div>
                <div className="text-right">01 02 130</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">12:15 13:45</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung Gruppe 6</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">02 01 535</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">12:15 13:45</div>
                <div className="col-span-2">8825 Lineare Algebra und Operations Research Gruppe 1</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Zimmer</div>
                <div className="text-right">01 01 110</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">14:00 15:30</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung Gruppe 4</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">02 01 535</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">14:00 15:30</div>
                <div className="col-span-2">8825 Lineare Algebra und Operations Research Gruppe 2</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Zimmer</div>
                <div className="text-right">01 01 110</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">16:00 17:30</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung Gruppe 5</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">02 01 535</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">16:00 17:30</div>
                <div className="col-span-2">8825 Lineare Algebra und Operations Research Gruppe 3</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Zimmer</div>
                <div className="text-right">01 01 110</div>
              </div>
            </div>
          </div>

          {/* Dienstag */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">Dienstag</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">8:15 9:45</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung Gruppe 1</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">02 01 535</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 11:30</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung Gruppe 2</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">02 01 535</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">12:15 13:45</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung Gruppe 3</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">02 01 535</div>
              </div>
            </div>
          </div>

          {/* Mittwoch */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">Mittwoch</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">8:15 9:45</div>
                <div className="col-span-2">8823 Algorithmen und Datenstrukturen</div>
                <div className="text-center">V</div>
                <div>Prof. Dr. Siebenlist</div>
                <div className="text-right">01 00 115</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 11:30</div>
                <div className="col-span-2">8826 Projektmanagement</div>
                <div className="text-center">V</div>
                <div>Prof. Dr. Reintjes</div>
                <div className="text-right">01 00 115</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">12:15 13:45</div>
                <div className="col-span-2">8821 Fortgeschrittene Programmierung</div>
                <div className="text-center">V</div>
                <div>Prof. Dr. Richter</div>
                <div className="text-right">01 00 115</div>
              </div>
            </div>
          </div>

          {/* Donnerstag */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">Donnerstag</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">8:15 9:45</div>
                <div className="col-span-2">8823 Algorithmen und Datenstrukturen Gruppe 1</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Siebenlist</div>
                <div className="text-right">02 01 530</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">8:15 9:45</div>
                <div className="col-span-2">8826 Projektmanagement Gruppe 4</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Reintjes</div>
                <div className="text-right">03 02 130</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 11:30</div>
                <div className="col-span-2">8823 Algorithmen und Datenstrukturen Gruppe 2</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Siebenlist</div>
                <div className="text-right">02 01 530</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 11:30</div>
                <div className="col-span-2">8826 Projektmanagement Gruppe 1</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Reintjes</div>
                <div className="text-right">03 02 130</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">12:15 13:45</div>
                <div className="col-span-2">8823 Algorithmen und Datenstrukturen Gruppe 3</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Siebenlist</div>
                <div className="text-right">02 01 530</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">12:15 13:45</div>
                <div className="col-span-2">8826 Projektmanagement Gruppe 2</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Reintjes</div>
                <div className="text-right">03 02 130</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">14:00 15:30</div>
                <div className="col-span-2">8823 Algorithmen und Datenstrukturen Gruppe 4</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Siebenlist</div>
                <div className="text-right">02 01 530</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">14:00 15:30</div>
                <div className="col-span-2">8826 Projektmanagement Gruppe 3</div>
                <div className="text-center">Ü</div>
                <div>Prof. Dr. Reintjes</div>
                <div className="text-right">03 02 130</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">17:45 19:15</div>
                <div className="col-span-2">
                  8524 Medienkonzeption und -gestaltung
                  <div className="text-xs text-gray-500 mt-1">Start: 10.04.25</div>
                </div>
                <div className="text-center">V&Ü</div>
                <div>Fr. Bierwolf</div>
                <div className="text-red-500 font-medium">digital/online</div>
              </div>
            </div>
          </div>

          {/* Freitag */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">Freitag</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 15:30</div>
                <div className="col-span-2">
                  8524 Medienkonzeption und -gestaltung
                  <div className="text-xs text-gray-500 mt-1">Blockveranstaltung: 04.04.25, 16.05.25, 13.06.25</div>
                </div>
                <div className="text-center">V&Ü</div>
                <div>Fr. Bierwolf</div>
                <div className="text-right">03 02 105</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">16:00 17:30</div>
                <div className="col-span-2">8822 Technische Informatik</div>
                <div className="text-center">V</div>
                <div>Dr. Maas</div>
                <div className="text-right">01 01 110</div>
              </div>
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">17:45 19:15</div>
                <div className="col-span-2">8822 Technische Informatik</div>
                <div className="text-center">Ü</div>
                <div>Dr. Maas</div>
                <div className="text-right">01 01 110</div>
              </div>
            </div>
          </div>

          {/* Samstag */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">Samstag</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">10:00 17:30</div>
                <div className="col-span-2">
                  8524 Medienkonzeption und -gestaltung
                  <div className="text-xs text-gray-500 mt-1">Blockveranstaltung: 05.04.25, 17.05.25, 14.06.25</div>
                </div>
                <div className="text-center">V&Ü</div>
                <div>Fr. Bierwolf</div>
                <div className="text-right">03 02 105</div>
              </div>
            </div>
          </div>

          {/* TBA */}
          <div className="mb-6">
            <div className="bg-slate-100 px-4 py-2 rounded-lg mb-3">
              <h3 className="font-semibold text-gray-800">TBA</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 items-center text-sm">
                <div className="font-medium text-gray-700">-</div>
                <div className="col-span-2">8823 Algorithmen und Datenstrukturen Gruppe 5</div>
                <div className="text-center">Ü</div>
                <div>Hr. Schmidl</div>
                <div className="text-right">tba</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default StundenplanModal;
