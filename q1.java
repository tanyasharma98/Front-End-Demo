 Scanner sc = new Scanner(System.in);
    String st = sc.nextLine();

    boolean sf = isPalindrome(st);
    if(sf == true){
      System.out.println("Yes");
    }else{
      System.out.println("NO");
    }
  }

  public static boolean isPalindrome(String st){
    int i = 0, j = st.length()-1;

    while(i<j/2){
      if(st.charAt(i) != st.charAt(j)){
        return false;
      }
      i++;
      j--;
    }
    return true;
  }