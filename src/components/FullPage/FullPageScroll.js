import { useRef, useEffect, useState } from "react";
import Dots from "./Dots";

const FullPageScroll = ({children}) => {

    // outer 스크롤 제어를 위해 useRef 훅 호출
    // 현재 페이지(섹션) 저장
    // 스크롤 중(페이지 전환 중) 스크롤 방지하기 위한 변수
    const outerDivRef = useRef();
    const currentPage = useRef(0);
    const canScroll = useRef(true);
	const [_, refresh] = useState(0);
    // 무슨 역할하는 지 파악

    // 다음 페이지로 이동
    const scrollDown = () => {
        // 화면 세로 길이 100vh 흠 이것도 자세하게 파악해야할듯
        const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
        // 스크롤 위쪽 끝부분 위치 => outerDivRef.current; 
        if(outerDivRef.current && pageHeight){
            outerDivRef.current.scrollTo({
                top: pageHeight * (currentPage.current+1),
                left: 0,
                behavior: 'smooth',
            });
            canScroll.current = false;
            setTimeout(()=>{
                canScroll.current = true;
            },500);
            if(outerDivRef.current.childElementCount-1 > currentPage.current ){
                currentPage.current++;
            }
        }
        // onPageChange(currentPage.current);
        refresh((v)=>v+1);
    };

    // 이전 페이지로 이동
    const scrollUp = () => {
        const pageHeight = outerDivRef.current?.children.item(0)?.clientHeight;
        if(outerDivRef.current && pageHeight){
            outerDivRef.current.scrollTo({
                top: pageHeight * (currentPage.current-1),
                left:0,
                behavior: 'smooth',
            });
            canScroll.current = false;
            setTimeout(()=>{
                canScroll.current = true;
            },500);
            if(currentPage.current > 0){
                currentPage.current--;
            }
        }
		// onPageChange(currentPage.current);
		refresh((v) => v + 1);
    };

    // 마우스 휠 감지
    const wheelHandler = (e) => {
        e.preventDefault(); // 무슨 역할?
        // canScroll.current -> true / false 값인건 알겠는데 current는 뭐지
        // outerDivRef.current -> 이것도 뭘까? scrollHeight 값은 또 뭐지
        if(canScroll.current){
            const { deltaY } = e;
            // console.log('scroll to', outerDivRef.current?.scrollHeight);
            if(deltaY > 0 && outerDivRef.current){
                scrollDown();
            }else if(deltaY < 0 && outerDivRef.current){
                scrollUp();
            }
        }
    };

    // 스크롤 기능 비활성화 함수
    const scrollHandler = (e) => {
        e.preventDefault();
    };

    // Dot을 눌렀을 때 해당 페이지로 이동
    const movePageTo = (idx) => {
        const num = currentPage.current;
        if(idx > num){
            for(let i = 0; i < idx-num; i++)
                scrollDown();
        }else if(idx < num){
            for(let i = 0; i < num-idx; i++)
                scrollUp();
        }
    };

    useEffect(()=>{
        const outer = outerDivRef.current;
        if (!outer) return;
		// onLoad(outerDivRef.current.childElementCount);
		refresh((v) => v + 1);
        outer.addEventListener("wheel",wheelHandler,{passive: false});
        outer.addEventListener("scroll",scrollHandler,{passive: false});
        outer.addEventListener("touchmove",scrollHandler,{passive: false});
        return () => {
            outer.removeEventListener("wheel",wheelHandler,{passive: false});
            outer.removeEventListener("scroll",scrollHandler,{passive: false});
            outer.removeEventListener("touchmove",scrollHandler,{passive: false});
        };
    },[]);


    // FullPageScroll은 outer와 inner div로 나뉜다.
    // outer는 전체 화면에 꽉 차는 크기이고, 항상 화면에 보여지는 div
    // inner는 전체 화면에 꽉 차는 크기이지만, 화면에 보이지 않을 수 있음
    // inner는 여러 개 있을 수 있고 outer 바로 안에 존재
    // outer가 full-page-scroll 자체
    // outer, inner 모두 스타일 height: 100vh로 맞춰줌
    // outer -> overflow-y:'hidden'으로 해줌
    // 스크롤 중 스크롤을 막기 위해서 setTimeOut 함수로 스크롤을 잠시 중단

    return(
        <>
            <div ref={outerDivRef} 
                style={{ height: "92.45vh", width: "100%", overflowY: "hidden" }}>
                { children }
            </div>
            <Dots
                limit={outerDivRef.current?.childElementCount || 0}
				currentIndex={currentPage.current}
				onDotClick={movePageTo}
            />
        </>
    );
}

export default FullPageScroll;