import { CheckIcon } from "lucide-react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { PropertyTrace } from "@/types/property-trace";
import { formatCurrency } from "@/lib/utils";

export default function TimelineTrace({ trace }: { trace: PropertyTrace[] }) {
  return (
    <Timeline defaultValue={3}>
      {trace.map((item, index) => (
        <TimelineItem
          key={index}
          step={index}
          className="group-data-[orientation=vertical]/timeline:ms-10"
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
            <TimelineDate>{new Date(item.saleDate).toDateString()}</TimelineDate>
            <TimelineTitle>{formatCurrency(item.value)}</TimelineTitle>
            <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
              <CheckIcon
                className="group-not-data-completed/timeline-item:hidden"
                size={16}
              />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>{item.name}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
