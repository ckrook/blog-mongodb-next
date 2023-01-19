import { toast } from "react-hot-toast";

// This is a helper function that will be used to fetch data from the API
export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

// This is a helper function that will be used to shorten the text
export function reduceText(text: string, length: number) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
}

// This is a helper function that will be used to calculate the read time
export function calculateReadTime(text: string) {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;

  return Math.ceil(numberOfWords / wordsPerMinute);
}

// This is a helper function that will be used to calculate the time since the post was created
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

// This is a helper function that will be used to convert the date to a string
export function convertNewDateToString(date: string) {
  const newDate = new Date(date);
  return newDate.toDateString();
}

// This is a helper function that will be used to save the url to the clipboard
export function SaveUrlToClipboard() {
  toast("Saved to clipboard!");
  const url = window.location.href;
  navigator.clipboard.writeText(url);
}

// This is a helper function that will be used to check if the user is the author of the post
export function checkTruthfulness(post: any, session: any) {
  if (post?.author?.email === session?.user?.email) {
    return true;
  }
  return false;
}
