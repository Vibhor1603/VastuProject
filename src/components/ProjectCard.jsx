import React from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Tag,
  FolderOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectCard({ project, onClick }) {
  const formattedDate = new Date(project.createdAt).toISOString().split("T")[0];

  return (
    <Card
      onClick={onClick}
      className="w-full h-full transition-all duration-200 hover:shadow-lg hover:scale-90 cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
    >
      <CardContent className="p-2 sm:p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-orange-800 line-clamp-1 mr-2">
            {project.name}
          </h3>
          <span className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-full whitespace-nowrap">
            {project.status || ""}
          </span>
        </div>

        {/* Project Details Grid - Compact on mobile */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
          {/* Created Date */}
          <div className="flex items-center text-orange-600 text-[11px] sm:text-xs">
            <CalendarDays size={12} className="mr-1 flex-shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </div>

          {/* Category */}
          <div className="flex items-center text-orange-600 text-[11px] sm:text-xs">
            <Tag size={12} className="mr-1 flex-shrink-0" />
            <span className="truncate">{project.type || "Uncategorized"}</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between text-orange-700 hover:text-orange-800 pt-1.5 sm:pt-2 border-t border-orange-200">
          <span className="text-[11px] sm:text-xs font-medium">
            View Details
          </span>
          <ChevronRight size={12} className="flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}
