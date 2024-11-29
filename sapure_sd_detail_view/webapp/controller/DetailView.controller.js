sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zc503sd.gw0002.sapuresddetailview.controller.DetailView", {
        onInit: function () {
            // expand 모델 초기화 및 뷰에 설정
            var oExpandModel = new sap.ui.model.json.JSONModel({ expanded: true });
            this.getView().setModel(oExpandModel, "expand");
            
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
                console.log("DetailSet before sorting data:", OData.results);

                var sortedData = OData.results.sort(function (a, b) {
                  if (a.Matnr < b.Matnr) return -1; // Matnr 기준 오름차순
                  if (a.Matnr > b.Matnr) return 1;
                  return 0;
                });
            
                console.log("DetailSet data after sorting:", sortedData);

                oModel.setData(sortedData);
                this.getView().setModel(oModel, "oModel");
              }.bind(this),
    
              error: function (error) {
                console.error("Error loading DetailSet:", error);
              },
            });
    
            // 자동 슬라이딩 설정
            this._startCarouselAutoSlide();
          },

            onAddToCart: function(){
              MessageToast.show("장바구니에 추가되었습니다!")
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
    