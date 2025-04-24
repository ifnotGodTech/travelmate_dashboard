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
  getAllFaq() {
    return axios.get(env.api.faq + "/categories/");
  }

  addFaq({ payload }: TAddFaq) {
    return axios.post(env.api.faq + "/", payload);
  }

  deleteFaq({ id }: { id: number }) {
    return axios.delete(env.api.faq + "/" + id);
  }
}
const FaqService = new Service();
export default FaqService;
