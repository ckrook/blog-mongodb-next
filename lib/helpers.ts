import { toast } from "react-hot-toast";

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function reduceText(text: string, length: number) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
}

export function calculateReadTime(text: string) {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;

  return Math.ceil(numberOfWords / wordsPerMinute);
}

export function timeSinceDate(date: string) {
  var seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function convertNewDateToString(date: string) {
  const newDate = new Date(date);
  return newDate.toDateString();
}

export function SaveUrlToClipboard() {
  toast("Saved to clipboard!");
  const url = window.location.href;
  navigator.clipboard.writeText(url);
}
