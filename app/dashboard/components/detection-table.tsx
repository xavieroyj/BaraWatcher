"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp, EllipsisVertical } from "lucide-react";
import { format } from "date-fns";
import { useRouter, usePathname } from "next/navigation";
import { rejectRequest, validateRequest } from "@/app/actions/validationRequest";
import { useToast } from "@/hooks/use-toast";

interface ValidationRequest {
  id: number;
  status: string;
  type: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  validationRequests: ValidationRequest[];
}

export default function ScamDetectionTable({ validationRequests }: Props) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const pathname = usePathname();

  const sortedRequests = [...validationRequests].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof ValidationRequest];
    const bValue = b[sortColumn as keyof ValidationRequest];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleValidate = async (id: number) => {
    setLoading(id);
    const result = await validateRequest(id);
    if (result.success) {
      toast({
        title: "Request Validated",
        description: "The request has been validated successfully",
      });
      router.refresh();
    } else {
      toast({
        title: "Failed to validate request",
        description: result.error,
      });
    }
    setLoading(null);
  };

  const handleReject = async (id: number) => {
    setLoading(id);
    const result = await rejectRequest(id);
    if (result.success) {
      toast({
        title: "Request Rejected",
        description: "The request has been rejected successfully",
      });
      router.refresh();
    } else {
      toast({
        title: "Failed to reject request",
        description: result.error,
      });
    }
    setLoading(null);
  };

  const router = useRouter();

  const handleNavigation = (id: number) => {
    router.push(`/dashboard/notes/${id}`); // Programmatically navigate to the dynamic route
  };

  const isAdminPage = pathname.endsWith("/admin"); // Check if the URL ends with /admin

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Validation Requests Dashboard</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">
                <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                  Date
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("type")}>
                  Type
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="max-w-[300px]">Content</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")}>
                  Status
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              {isAdminPage && (
              <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.map((request) => (
              <TableRow key={request.id} onClick={() => handleNavigation(request.id)}>
                <TableCell className="font-medium">
                  {format(new Date(request.createdAt), "MM/dd/yyyy")}
                </TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell className="max-w-[560px] truncate">{request.content}</TableCell>
                <TableCell>
                    <Badge
                    variant={
                      request.status === "PENDING"
                      ? "outline"
                      : request.status === "IN_PROGRESS"
                      ? "secondary"
                      : "default"
                    }
                    className={
                      request.status === "PENDING"
                      ? "bg-yellow-500"
                      : request.status === "IN_PROGRESS"
                      ? "bg-blue-800"
                      : "bg-green-600"
                    }
                    >
                    {request.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isAdminPage && ( // Conditionally render the dropdown menu
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(request.id.toString())}
                        >
                          Copy request ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleValidate(request.id);
                          }}
                          disabled={loading === request.id}
                        >
                          {loading === request.id ? "Processing..." : "Mark as Validated"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(request.id);
                          }}
                          disabled={loading === request.id}
                        >
                          {loading === request.id ? "Processing..." : "Mark as Rejected"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
