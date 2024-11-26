sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zc503sd.gw0002.sapuresddetailview.controller.DetailView", {
        onInit: function () {
            // JSON 모델 설정 (이미지 데이터)
            var oImageModel = new sap.ui.model.json.JSONModel();
            oImageModel.loadData("model/images.json");
            this.getView().setModel(oImageModel, "imageModel");
    
            // OData 모델 설정 (DetailSet 데이터)
            var oODataModel = new sap.ui.model.odata.v2.ODataModel(
              "/sap/opu/odata/sap/ZC503SDCDS0002_CDS/"
            );
            var oModel = new sap.ui.model.json.JSONModel();
            // this.getView().setModel(oModel);
    
            // DetailSet 데이터 로드 및 로그 확인
            oODataModel.read("/DetailSet", {
              success: function (OData) {
                console.log("DetailSet data:", OData.results);
                oModel.setData(OData.results);
                this.getView().setModel(oModel, "oModel");
              }.bind(this),
    
              error: function (error) {
                console.error("Error loading DetailSet:", error);
              },
            });
    
            // 자동 슬라이딩 설정
            this._startCarouselAutoSlide();
          },
    
          onCollapseExpandPress() {
            const oSideNavigation = this.byId("sideNavigation"),
              bExpanded = oSideNavigation.getExpanded();
    
            oSideNavigation.setExpanded(!bExpanded);
          },
    
          _startCarouselAutoSlide: function () {
            var oCarousel = this.byId("productImages");
            var iSlideIndex = 0; // 현재 슬라이드 인덱스
            var iSlideCount = oCarousel.getPages().length; // 슬라이드 총 개수
    
            // 3초마다 슬라이드 변경
            setInterval(function () {
              iSlideIndex = (iSlideIndex + 1) % iSlideCount; // 다음 슬라이드 인덱스 계산
              oCarousel.setActivePage(oCarousel.getPages()[iSlideIndex]); // 슬라이드 전환
            }, 3000); // 3000ms = 3초
          },
        }
      );
    });
    