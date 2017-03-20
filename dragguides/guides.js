var MIN_DISTANCE = 20;
var verticalGuideId = "#guide-v";
var horizontalGuideId = "#guide-h";
var guides = [];
var innerOffsetX, innerOffsetY;

function computeGuidesForElement(elem, pos, w, h) {

  if (elem != null) {
    var $t = $(elem);
    pos = $t.offset();
    w = $t.outerWidth() - 1;
    h = $t.outerHeight() - 1;
  }

  return [{
    type: "v",
    left: pos.left,
    top: pos.top
  }, {
    type: "v",
    left: pos.left,
    top: pos.top + h
  }, {
    type: "h",
    left: pos.left,
    top: pos.top
  }, {
    type: "h",
    left: pos.left + w,
    top: pos.top
  }, {
    type: "v",
    left: pos.left,
    top: pos.top + h / 2
  }, {
    type: "h",
    left: pos.left + w / 2,
    top: pos.top
  }];
}

var debounceFun = _.debounce(function(event, ui) {

      var self = this;

      var chosenGuides = {
        top: {
          dist: MIN_DISTANCE + 1
        },
        left: {
          dist: MIN_DISTANCE + 1
        }
      };

      var thisNode = $(self);
      var pos = thisNode.offset();

      if (!(pos && (pos["left"] || (pos["left"] === 0)) && (pos["left"] || (pos["left"] === 0)))) {
        console.error(1,"throw no pos");
        pos = {
          top: event.originalEvent.pageY - event.originalEvent.offsetY,
          left: event.originalEvent.pageX - event.originalEvent.offsetX
        };
      }

      var w = thisNode.outerWidth() - 1;
      var h = thisNode.outerHeight() - 1;

      var elemGuides = computeGuidesForElement(null, pos, w, h);
      console.info("position (",pos.top,",",pos.left,")")
      $.each(guides, function(i, guide) {

        $.each(elemGuides, function(j, elemGuide) {

          if (guide.type === elemGuide.type) {

            var prop = (guide.type === "v") ? "top" : "left";
            var d = Math.abs(elemGuide[prop] - guide[prop]);
            if (d < chosenGuides[prop].dist) {
              chosenGuides[prop].dist = d;
              chosenGuides[prop].offset = elemGuide[prop] - pos[prop];
              chosenGuides[prop].guide = guide;
            }
          }
        });
      });

      console.debug("chosenGuides ", chosenGuides);
      console.debug("top,left", ui.position.top, ",", ui.position.left);
      if (chosenGuides.top.dist <= MIN_DISTANCE) {
        $(horizontalGuideId).css("top", chosenGuides.top.guide.top).show();
        console.warn("top move ->", (chosenGuides.top.guide.top - chosenGuides.top.offset));
        ui.helper.offset({top: (chosenGuides.top.guide.top - chosenGuides.top.offset) });
        }
        else {
          $(horizontalGuideId).hide();
          ui.helper.offset({top:  pos.top });
        }

        if (chosenGuides.left.dist <= MIN_DISTANCE) {
          $(verticalGuideId).css("left", chosenGuides.left.guide.left).show();
          console.warn("left move->", (chosenGuides.left.guide.left - chosenGuides.left.offset));
          ui.helper.offset({left:  (chosenGuides.left.guide.left - chosenGuides.left.offset) });
          }
          else {
            $(verticalGuideId).hide();
            ui.helper.offset({left:  pos.left });
          }
        }, 100);


      $(".draggable").draggable({

        start: function(event) {
          var siblingsNodes = $(this).siblings(".draggable");
          guides = $.map(siblingsNodes, computeGuidesForElement);
          innerOffsetX = event.originalEvent.offsetX;
          innerOffsetY = event.originalEvent.offsetY;
        },

        drag: function(event, ui) {
          debounceFun.call(this, event, ui);
        },
        stop: function() {
          $(verticalGuideId + "," + horizontalGuideId).hide();

        }
      });
