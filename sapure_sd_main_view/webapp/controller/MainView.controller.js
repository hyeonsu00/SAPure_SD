sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zc503sd.gw0006.sapuresdmainview.controller.MainView", {
        onInit: function () {
            // JSON 모델 설정 (이미지 데이터)
            var oImageModel = new sap.ui.model.json.JSONModel();
            oImageModel.loadData("model/images.json");
            this.getView().setModel(oImageModel, "imageModel");
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
        onHoverChange: function (oEvent) {
            // StandardListItem의 customData에서 값 읽기
            var oCustomData = oEvent.getSource().getCustomData();
            var sImagePath = oCustomData.find(data => data.getKey() === "imagePath").getValue();
        
            // 이미지 컴포넌트를 찾아 src 속성 업데이트
            var oDynamicImage = this.byId("dynamicImage");
            oDynamicImage.setSrc(sImagePath);
        }        
    });
});
