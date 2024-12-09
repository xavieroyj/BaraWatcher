"use client"

import { useState } from "react"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDownUp, DotIcon } from "lucide-react"

// Sample data for the table
const scamReports = [
  {
    id: "1",
    reportedDate: "2023-05-15",
    scamType: "Phishing",
    description: "Suspicious email claiming to be from a bank",
    urgency: "High",
    status: "Pending",
  },
  {
    id: "2",
    reportedDate: "2023-05-14",
    scamType: "Investment Fraud",
    description: "Unsolicited offer for high-return investment",
    urgency: "Medium",
    status: "Under Review",
  },
  {
    id: "3",
    reportedDate: "2023-05-13",
    scamType: "Tech Support",
    description: "Call claiming computer is infected with virus",
    urgency: "Low",
    status: "Pending",
  },
  {
    id: "4",
    reportedDate: "2023-05-12",
    scamType: "Romance Scam",
    description: "Online dating profile requesting money",
    urgency: "High",
    status: "Pending",
  },
  {
    id: "5",
    reportedDate: "2023-05-11",
    scamType: "Job Scam",
    description: "Email offering high-paying work-from-home job",
    urgency: "Medium",
    status: "Under Review",
  },
]

export default function ScamDetectionTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const sortedReports = [...scamReports].sort((a, b) => {
    if (!sortColumn) return 0
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Scam Detection Dashboard</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("reportedDate")}
                >
                  Date
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("scamType")}
                >
                  Type
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="max-w-[300px]">Description</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("urgency")}
                >
                  Urgency
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.reportedDate}</TableCell>
                <TableCell>{report.scamType}</TableCell>
                <TableCell className="max-w-[300px] truncate">{report.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.urgency === "High"
                        ? "destructive"
                        : report.urgency === "Medium"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {report.urgency}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "Pending"
                        ? "outline"
                        : report.status === "Under Review"
                        ? "secondary"
                        : "default"
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(report.id)}>
                        Copy report ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Review report</DropdownMenuItem>
                      <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                      <DropdownMenuItem>Dismiss report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
