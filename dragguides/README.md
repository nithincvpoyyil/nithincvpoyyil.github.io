# DragGuides

This project was created from the core idea of a [StackOverflow Q&A](http://stackoverflow.com/questions/10026234/guides-when-moving-jquery-ui-draggable-boxes) which did not considered snaping guides for parent-child DOM elements.

>Project is using jquery, jQueryUI and UnderscoreJS as libraries for snap guide function.


**Logic**

```
- The main idea is create all 6 snap guide points of each sibling elements and store as guide array on drag start.

- On dragging function find least distant guide points with related to selected nodes snap guide points. 

- Postion the snap guide to the closest guide point. 

- Using offset value move selected node to the snap guide line

```

