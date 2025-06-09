import CMSService from "@/services/cms";
import { useState } from "react";
import { useEffect } from "react";

export function useGetAllServices({
  initalFetch = true,
  refresh = false,
}: {
  initalFetch?: boolean;
  refresh?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const onCMSdata = async () => {
    setLoading(true);
    try {
      const res = await CMSService.getServices();
      setData(res.data.results);
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initalFetch || refresh) onCMSdata();
  }, [initalFetch, refresh]);

  return { loading, data };
}
export function useEditServices() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const onCMSdata = async ({
    id,
    payload,
    successCallback,
    errorCallback,
  }: {
    id: string;
    payload: any;
    successCallback?: () => void;
    errorCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await CMSService.updateService({ id, payload });
      setData(res.data.results);
      if (successCallback) successCallback();
    } catch (error) {
      console.error("Error updating service:", error);
      if (errorCallback) errorCallback();
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, onCMSdata };
}
