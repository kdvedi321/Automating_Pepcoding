import java.io.*;
import java.util.*;

public class Main{

public static void main(String[] args) throws Exception {
    Scanner scn = new Scanner(System.in);
    int n = scn.nextInt();
    int dp[] = new int[n+1];
    System.out.println(fibonacci(n, dp));
 }
 public static int fibonacci(int n, int dp[]){
     dp[0]=0;
     dp[1]=1;
     for(int i=2;i<=n;i++){
         dp[i]=dp[i-1]+dp[i-2];
     }
     return dp[n];
 }

}