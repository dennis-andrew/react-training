// Q1
function evenOrOdd(a){
    if(a%2===0){
        return true;
    }else{
        return false;
    }
}

// Q2
function larger(a,b){
    if(a>b){
        return a;
    }else{
        return b;
    }
}

// Q3
function checkNum(a){
    if(a===0){
        console.log(`${a} is zero.`);
    }else if(a>0){
        console.log(`${a} is positive.`);
    }else{
        console.log(`${a} is negative`);
    }
}

// Q4
function sumPositive(a,b){
    if(a>0 && b>0){
        return a+b;
    }else{
        return 0;
    }
}

// Q5
function checkDiv(a){
    if(a%3==0 && a%5==0){
        return true;
    }else{
        return false;
    }
}

// Q6
function sumOfNum(n){
    let sum=0;
    for(let i=1;i<=n;i++){
        sum+=i;
    }
    return sum;
}

// Q7
function fact(n){
    let ans=1;
    for(let i=n;i>=1;i--){
        ans*=i;
    }
    return ans;
}

// Q8
function noOfDigits(n){
    let ans=0;
    while(n>0){
        ans++;
        n/=10;
    }
    return ans;
}

// Q9
function reverse(n){
    let ans=0;
    while(n>0){
        last=n%10;
        ans=ans*10+last;
        n/=10;
    }
    return ans;
}

// Q10
function isPrime(n){
    if(n==0 || n==1){
        return false;
    }

    for(let i=2;i<n;i++){
        if(n%i===0){
            return false;
        }
    }

    return true;
}