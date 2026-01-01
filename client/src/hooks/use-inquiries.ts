import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateInquiryInput } from "@shared/routes";

export function useInquiries() {
  return useQuery({
    queryKey: [api.inquiries.list.path],
    queryFn: async () => {
      const res = await fetch(api.inquiries.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      return api.inquiries.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateInquiryInput) => {
      const res = await fetch(api.inquiries.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.inquiries.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit inquiry");
      }
      return api.inquiries.create.responses[201].parse(await res.json());
    },
    // We don't invalidate list here because public users don't see the list
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: number; status: string; adminNotes?: string }) => {
      const url = buildUrl(api.inquiries.updateStatus.path, { id });
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update status");
      return api.inquiries.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.inquiries.list.path] }),
  });
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete inquiry");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.inquiries.list.path] }),
  });
}
