"""
New Hatty Bot implementation using Google Generative AI and LangChain
"""
import os
import logging
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
import google.generativeai as genai
from langchain.memory import ConversationBufferMemory
from langchain.schema import BaseMessage, HumanMessage, AIMessage

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class HattyBot:
    """Hatty Bot using Google Generative AI with LangChain memory"""
    
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            raise ValueError("GOOGLE_API_KEY not found in environment variables")
        
        # Configure Google Generative AI
        try:
            genai.configure(api_key=self.api_key)
            logger.info("Google Generative AI configured successfully")
        except Exception as e:
            logger.error(f"Failed to configure Google Generative AI: {e}")
            raise
        
        # System prompt for Hatty
        self.system_prompt = """
Role and Goal: You are Hatty, the official chatbot assistant of the Rhine-Waal University of Applied Sciences (HSRW). Your main goal is to provide helpful and accurate information about the university to students, prospective students, staff, and visitors.

Persona: Maintain a friendly, helpful, and professional tone. Be patient and clear in your explanations.

Language: Respond exclusively in German.

Knowledge Base: Your knowledge is based on publicly available information from the HSRW website (e.g., study programs, application procedures, campus information, contact details, events). If you don't know an answer, politely admit it and suggest contacting the relevant university department or consulting the official website.

Response Format: Every response must begin exactly with "Hatty: ". Do not add any other text before this prefix.

Example:
   User: Who are you?
   Hatty: Ich bin Hatty, der offizielle Chatbot der Hochschule Rhein-Waal. Wie kann ich dir heute helfen?

Constraints: Do not give personal opinions, engage in off-topic conversations, or access external websites beyond the scope of HSRW information unless explicitly instructed for a specific task (e.g., linking to an HSRW page). Prioritize accuracy and helpfulness.
"""
        
        # Initialize the model
        try:
            self.model = genai.GenerativeModel(
                model_name='gemini-2.0-flash-exp',
                system_instruction=self.system_prompt
            )
            logger.info("Gemini model initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Gemini model: {e}")
            # Try alternative model name
            try:
                self.model = genai.GenerativeModel(
                    model_name='gemini-pro',
                    system_instruction=self.system_prompt
                )
                logger.info("Gemini Pro model initialized successfully as fallback")
            except Exception as e2:
                logger.error(f"Failed to initialize fallback model: {e2}")
                raise
        
        # Initialize conversation with memory
        self.chat = self.model.start_chat(history=[])
        self.memory = ConversationBufferMemory(return_messages=True)
        
        logger.info("Hatty Bot initialized successfully")
    
    def send_message(self, message: str) -> str:
        """
        Send a message to Hatty and get a response
        
        Args:
            message: User message
            
        Returns:
            Hatty's response
        """
        try:
            logger.info(f"Sending message to Hatty: {message[:50]}...")
            
            # Send message to the model
            response = self.chat.send_message(message)
            response_text = response.text
            
            # Ensure response starts with "Hatty: "
            if not response_text.startswith("Hatty: "):
                response_text = f"Hatty: {response_text}"
            
            # Store in memory for context
            self.memory.chat_memory.add_user_message(message)
            self.memory.chat_memory.add_ai_message(response_text)
            
            logger.info(f"Hatty response: {response_text[:100]}...")
            return response_text
            
        except Exception as e:
            logger.error(f"Error sending message to Hatty: {e}")
            error_response = "Hatty: Entschuldigung, ich habe gerade technische Schwierigkeiten. Bitte versuche es später noch einmal."
            
            # Still store the conversation for context
            try:
                self.memory.chat_memory.add_user_message(message)
                self.memory.chat_memory.add_ai_message(error_response)
            except Exception:
                pass  # Ignore memory errors
            
            return error_response
    
    def get_conversation_history(self) -> List[Dict[str, str]]:
        """Get the conversation history"""
        history = []
        messages = self.memory.chat_memory.messages
        
        for i in range(0, len(messages), 2):
            if i + 1 < len(messages):
                user_msg = messages[i]
                ai_msg = messages[i + 1]
                history.append({
                    "user": str(user_msg.content),
                    "hatty": str(ai_msg.content)
                })
        
        return history
    
    def clear_conversation(self):
        """Clear the conversation history"""
        self.memory.clear()
        self.chat = self.model.start_chat(history=[])
        logger.info("Conversation history cleared")
    
    def is_available(self) -> bool:
        """Check if Hatty is available"""
        try:
            # Test with a simple message
            self.model.generate_content("Test")
            return True
        except Exception as e:
            logger.error(f"Hatty availability check failed: {e}")
            return False


# Global instance
_hatty_instance: Optional[HattyBot] = None

def get_hatty_instance() -> Optional[HattyBot]:
    """Get or create the global Hatty instance"""
    global _hatty_instance
    
    if _hatty_instance is None:
        try:
            _hatty_instance = HattyBot()
            logger.info("Hatty instance created successfully")
        except Exception as e:
            logger.error(f"Failed to create Hatty instance: {e}")
            return None
    
    return _hatty_instance

def cleanup_hatty():
    """Clean up the Hatty instance"""
    global _hatty_instance
    if _hatty_instance:
        _hatty_instance.clear_conversation()
        _hatty_instance = None
        logger.info("Hatty instance cleaned up")
