import { getOverflowValue } from "@/utils/showTooltip.js";

export default function getItemsList(arr, fn) {
  arr.forEach((task) => {
    fn(task);
    getOverflowValue(".list-title");
    getOverflowValue(".list-projectCode");
    getOverflowValue(".list-create");
    getOverflowValue(".list-update");
  });
}
