import axios from "axios";
import env from "@/config/env";

type TAddFaq = {
  payload: {
    category: number;
    question: string;
    answer: string;
    is_active: boolean;
  };
};

class Service {
  getAllChats(url?: string) {
    const endpoint = url || env.api.chat;
    return axios.get(endpoint);
  }

  getChatMessages({ id }: { id: number }) {
    return axios.get(env.api.chat + "/" + id);
  }

  deleteFaq({ id }: { id: number }) {
    return axios.delete(env.api.faq + "/" + id);
  }
}
const ChatService = new Service();
export default ChatService;
