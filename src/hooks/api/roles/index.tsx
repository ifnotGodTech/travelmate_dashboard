import { useState, useEffect, useRef, useCallback } from "react";
import RolesService from "@/services/roles";

export function useGetAllEscalationLevel({
  initalFetch = true,
  refresh = false,
}: {
  initalFetch?: boolean;
  refresh?: boolean;
}) {
  const [Levelloading, setLoading] = useState(false);
  const [Leveldata, setData] = useState<any | null>(null);

  const onEscalationLevel = async () => {
    setLoading(true);
    try {
      const res = await RolesService.getRoles();
      setData(res.data.results);
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initalFetch || refresh) onEscalationLevel();
  }, [initalFetch, refresh]);

  return { Levelloading, Leveldata };
}

export function useMyRoles({
  modalVisible = false,
}: {
  modalVisible?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  const onGetMyRole = async () => {
    setLoading(true);
    try {
      const res = await RolesService.getMyRole();
      setData(res.data.results[0]);
    } catch (error) {
      console.error("Error fetching escalation levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalVisible) onGetMyRole();
  }, [modalVisible]);

  return { loading, data };
}
