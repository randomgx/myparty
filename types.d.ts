import { Event } from "./types/collections";

interface EventWithTime extends Event {
  parsed_date: string;
  parsed_time: string;
}
