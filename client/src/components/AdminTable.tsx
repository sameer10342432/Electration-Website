import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Inquiry } from "@shared/schema";
import { format } from "date-fns";
import { useState } from "react";
import { useUpdateInquiryStatus, useDeleteInquiry } from "@/hooks/use-inquiries";
import { Loader2, Eye, Trash2 } from "lucide-react";

interface AdminTableProps {
  inquiries: Inquiry[];
}

const statusColors: Record<string, string> = {
  "New": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "Contacted": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  "Completed": "bg-green-100 text-green-700 hover:bg-green-100",
  "Spam": "bg-red-100 text-red-700 hover:bg-red-100",
};

export function AdminTable({ inquiries }: AdminTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <InquiryRow key={inquiry.id} inquiry={inquiry} />
          ))}
          {inquiries.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No inquiries found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const { mutate, isPending } = useUpdateInquiryStatus();
  const { mutate: deleteInquiry, isPending: isDeleting } = useDeleteInquiry();
  const [notes, setNotes] = useState(inquiry.adminNotes || "");

  const handleStatusChange = (status: string) => {
    mutate({ id: inquiry.id, status, adminNotes: notes });
  };

  const handleSaveNotes = () => {
    mutate({ id: inquiry.id, status: inquiry.status, adminNotes: notes });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) {
      deleteInquiry(inquiry.id);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium text-muted-foreground">
        {format(new Date(inquiry.createdAt || new Date()), "MMM d, HH:mm")}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-bold text-foreground">{inquiry.fullName}</span>
          <span className="text-xs text-muted-foreground">{inquiry.phone}</span>
          <span className="text-xs text-muted-foreground">{inquiry.city}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{inquiry.service}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
            {inquiry.message}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Select defaultValue={inquiry.status} onValueChange={handleStatusChange} disabled={isPending}>
          <SelectTrigger className={`w-[130px] h-8 border-none ${statusColors[inquiry.status]}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Spam">Spam</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Inquiry Details #{inquiry.id}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Customer</h4>
                    <p className="font-semibold">{inquiry.fullName}</p>
                    <p className="text-sm">{inquiry.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                    <p className="font-semibold">{inquiry.city}</p>
                    <p className="text-sm">{inquiry.areaAddress || "No address provided"}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Service Request</h4>
                  <p className="font-semibold text-primary">{inquiry.service}</p>
                  <p className="text-sm mt-1 bg-muted p-3 rounded-md">{inquiry.message}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Admin Notes</h4>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add internal notes here..."
                    className="resize-none"
                  />
                  <Button
                    onClick={handleSaveNotes}
                    disabled={isPending}
                    size="sm"
                    className="w-full"
                  >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Notes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-red-600 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
