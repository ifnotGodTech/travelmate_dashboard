import axios from "axios";
import env from "@/config/env";
import instance from "@/hooks/initializers/useAxiosDefaults";

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
    return instance.get(endpoint);
  }

  getChat({ id }: { id: string }) {
    return instance.get(env.api.chat + id + "/");
  }

  getChatMessages({ id }: { id: number }) {
    return instance.get(env.api.chat + "/" + id);
  }

  claimChat({ id }: { id: any }) {
    return instance.post(env.api.chat + id + "/claim/");
  }

  closeChat({ id }: { id: number }) {
    return instance.post(env.api.chat  + id + "/close/");
  }

  deleteFaq({ id }: { id: number }) {
    return instance.delete(env.api.faq + "/" + id);
  }

  uploadAttachment(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return instance.post(env.api.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const ChatService = new Service();
export default ChatService;
