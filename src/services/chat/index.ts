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

  getChat({ id }: { id: string }) {
    return axios.get(env.api.chat + id + "/");
  }

  getChatMessages({ id }: { id: number }) {
    return axios.get(env.api.chat + "/" + id);
  }

  claimChat({ id }: { id: any }) {
    return axios.post(env.api.chat + id + "/claim/");
  }

  closeChat({ id }: { id: number }) {
    return axios.post(env.api.chat  + id + "/close/");
  }

  deleteFaq({ id }: { id: number }) {
    return axios.delete(env.api.faq + "/" + id);
  }

  uploadAttachment(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(env.api.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const ChatService = new Service();
export default ChatService;
