public class QuickSort {

    public static void main(String[] args) {

        int[] arr = { 5, 4, 3, 2, 1 };
        sort(arr, 0, arr.length - 1);

        // Arays.sort();

    }

    static void sort(int[] nums, int low, int high) {

        if (low >= high) {
            return;
        }

        int start = low;
        int end = high;
        int middle = start + (end - start) / 2;
        int pivot = nums[middle];

        while (start <= end) {
            while (nums[start] < pivot) {
                start++;
            }
            while (nums[end] > pivot) {
                end--;
            }

            if (start <= end) {
                int temp = nums[start];
                nums[start] = nums[end];
                nums[end] = temp;
                start++;
                end--;
            }
        }
        // now my pivot is at correct index, now we sort two halves (two subarrays)

        sort(nums, low, end);
        sort(nums, start, high);
    }
}
