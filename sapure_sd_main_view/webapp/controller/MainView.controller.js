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

            // 초기 이미지 설정
            this._setInitialImage();

            // Hover 이벤트 연결
            this._attachHoverEvents();
        },

        _setInitialImage: function () {
            // 첫 번째 항목의 이미지 경로를 동적으로 설정
            const oList = this.byId("selectionList");
            const oFirstItem = oList.getItems()[0]; // 첫 번째 항목 가져오기
            const aCustomData = oFirstItem.getCustomData(); // CustomData 가져오기
            if (aCustomData && aCustomData.length > 0) {
                const sImagePath = aCustomData.find(data => data.getKey() === "imagePath").getValue();
                this.byId("dynamicImage").setSrc(sImagePath); // 첫 번째 이미지 설정
                this._currentImagePath = sImagePath; // 현재 이미지 경로를 저장
            }
        },

        _attachHoverEvents: function () {
            // List 컨트롤의 모든 CustomListItem 가져오기
            const oList = this.byId("selectionList");
            const oItems = oList.getItems();

            // 각 CustomListItem에 Hover 이벤트 추가
            oItems.forEach(item => {
                const aCustomData = item.getCustomData();
                if (aCustomData && aCustomData.length > 0) {
                    const sImagePath = aCustomData.find(data => data.getKey() === "imagePath").getValue();

                    item.addEventDelegate({
                        onmouseover: () => {
                            const oImage = this.byId("dynamicImage");

                            // 같은 이미지라면 아무 동작도 하지 않음
                            if (this._currentImagePath === sImagePath) {
                                return;
                            }

                            // 다른 이미지라면 페이드아웃 효과 추가
                            oImage.addStyleClass("fade-out");

                            // 500ms 후 이미지 변경
                            setTimeout(() => {
                                oImage.setSrc(sImagePath); // 이미지 변경
                                oImage.removeStyleClass("fade-out"); // 페이드아웃 효과 제거
                                this._currentImagePath = sImagePath; // 현재 이미지 경로 업데이트
                            }, 200); // 페이드아웃 지속 시간
                        }
                    });
                }
            });
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
        }
    });
});
