if (documents.length > 0 && activeDocument.pathItems.length > 0){
 
          var allPaths = activeDocument.pathItems;
          var allPathsCount = allPaths.length;
          var openPathsAreLocked = false;
          var lockedOpenPaths = 0;
          var locked = false;
          for (var i=0; i < allPathsCount; i++){
                    allPaths[ i ].selected = false;
 
                    if( ! allPaths[ i ].closed){
 
                              try{
                                        allPaths[ i ].selected = true;
                              } catch (e) {
                                        openPathsAreLocked = true;
                                        lockedOpenPaths++;
                              }
 
                    }
          }
          if (openPathsAreLocked) alert (lockedOpenPaths + " open paths are locked or hidden (or their layer is locked or hidden) and cannot be selected");
}