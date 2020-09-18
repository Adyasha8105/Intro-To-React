#include <bits/stdc++.h>

using namespace std;

int main()
{
    int arr[100], n, i, even = 0, odd = 0;
    cin >> n;
    for (i = 0; i <= n; i++)
    {
        cin >> arr[i];
    }
    for (i = 0; i <= n; i++) 
    {
        if (((i % 2) == 0) && ((arr[i] % 2) == 0))
            even = even + arr[i];
        else if (((i % 2) != 0) && ((arr[i] % 2) != 0))
        {
            odd = odd + arr[i];
        }
    }
      cout<<even<<" "<<odd;
    return 0;
}
