def goodSegement1(badList,l,r):

    sortedBadList  = sorted(badList)
    current =sortedBadList[0]
    maxVal = 0

    for i in range(len(sortedBadList)):
        current = sortedBadList[i]
        maxIndex = i+1

        # first value
        if i == 0 and l<=current<=r:
            val = current - l
            prev = l
            print("first index value")
            print("prev, current : ",prev,current)
            if(val>maxVal):
                maxVal = val
                print("1. (s,e)",l,current)
        # other middle values
        elif l<=current<=r:
            prev = sortedBadList[i-1]
            val = current - prev
            print("prev, current : ",prev,current)
            if(val>maxVal):
                maxVal = val
                print("2. (s,e)",prev,current)
        # last value    
        if maxIndex == len(sortedBadList) and l<=current<=r:
            print("last index value")
            next = r
            val = next - current
            if(val>maxVal):
                maxVal = val
                print("3. (s,e)",current,next)

    print("maxVal:",maxVal-1)
pass

goodSegement1([2,5,8,10,3],1,12)
goodSegement1([37,7,22,15,49,60],3,48)
