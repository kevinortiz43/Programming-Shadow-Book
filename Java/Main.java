
import java.util.ArrayList;

public class Main {

    static int addTwo(int number) {
        number += 2;

        return number;
    };

    static int add(int number1, int number2) {

        number1 += number2;
        return number1;
    };

    static int multiplyByTwo(int numero) {

        numero *= 2;
        return numero;
    };

    static int multiply(int val1, int val2) {
        val1 *= val2;

        return val1;
    };

    static int square(int value) {

        value *= value;
        return value;
    };

    static String isOdd(int num) {

        if (num % 2 == 0) {
            return "Is odd";
        } else {

            return "Not odd";
        }
    };

    public String isNegative(int num) {
        if (num > -1) {
            return "positive";
        }
        return "not negative";
    }

    public static ArrayList<Integer> returnOdds(int[] array) {

        ArrayList<Integer> dynamicArray = new ArrayList<>();

        for (int element : array) {
            if (element % 2 != 0) {
                dynamicArray.add(element);
            }

        }

        return dynamicArray;

    };

    public static void main(String[] args) {
        System.out.println("challenge add one");
        System.out.println(addTwo(3));

        System.out.println("challenge add two");
        System.out.println(add(1, 2));

        System.out.println("challenge multiply by two");
        System.out.println(multiplyByTwo(2));

        System.out.println("challenge multiply");
        System.out.println(multiply(10, 9));

        System.out.println("challenge sqiare");
        System.out.println(square(5));

        System.out.println("challenge is odd");
        System.out.println(isOdd(4));

        System.out.println("Return odds");
        int[] oddsArray = { 1, 2, 3, 4, 5 };
        System.out.println(returnOdds(oddsArray));

    }
}
