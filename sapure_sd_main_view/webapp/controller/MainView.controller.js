sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("zc503sd.gw0006.sapuresdmainview.controller.MainView", {
        onInit: function () {
            // JSON 모델 설정 (이미지 데이터)
            var oImageModel = new sap.ui.model.json.JSONModel();
            oImageModel.loadData("model/images.json");
            this.getView().setModel(oImageModel, "imageModel");

            // Hover 이벤트 연결
            this._attachHoverEvents();
        },

        onCollapseExpandPress: function () {
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

        _attachHoverEvents: function () {
            // List 컨트롤의 모든 StandardListItem 가져오기
            const oList = this.byId("selectionList"); // List의 ID를 할당해야 합니다
            const oItems = oList.getItems();

            // 각 아이템에 Hover 이벤트 추가
            oItems.forEach(item => {
                item.addEventDelegate({
                    onmouseover: () => {
                        const aCustomData = item.getCustomData();
                        const sImagePath = aCustomData.find(data => data.getKey() === "imagePath").getValue();
                        this.byId("dynamicImage").setSrc(sImagePath);
                    }
                });
            });
        },
    });
});
