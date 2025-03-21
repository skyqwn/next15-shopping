"use client";

import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "언제 배송이 되는지 궁금해요.",
    answer: `상세 페이지에 기재된 '배송정보' 일정에 맞춰 배송되고 있습니다.
  
  • 일반 배송 상품: 주문 시점으로부터 최대 3일 이내 배송
  • 주문제작/예약 출고 상품: 판매자가 기재한 일정 이내 출고
  
  상품마다 배송정보가 다를 수 있으니 상세 페이지를 참고해 주세요.
  
  배송시작 알림톡을 받으셨다면 'MY > 주문 목록'에서 운송장 흐름을 확인하실 수 있습니다.
  
  ※ 출고 이후 배송 상황에 따라 기간이 더 소요될 수 있습니다.`,
  },
  {
    question: "주문을 취소하고 싶어요.",
    answer: `■ 주문 상태별 취소 안내
  
  1. 결제 완료
     • 신청 즉시 주문이 취소됩니다.
     • 주문건 전체 취소 시 사용한 적립금과 쿠폰은 반환되어 재사용 가능합니다.
  
  2. 상품 준비중
     • 취소 요청 승인 시 주문이 자동 취소됩니다.
     • 배송 준비가 완료된 경우 취소 요청이 거절될 수 있습니다.
  
  ※ 일부 상품 취소로 무료배송 조건이 충족되지 않을 경우, 배송비 차감 후 취소될 수 있습니다.`,
  },
  {
    question: "상품을 받았는데 교환하고 싶어요.",
    answer: `교환 신청 시 유의사항:
  
  • 업체 귀책 사유로 교환/반품 접수 시 확인할 수 있는 사진을 첨부해주세요.
  • 교환 접수 완료 후, 안내된 계좌로 배송비를 입금해주세요.
  • 상품은 원래 상태 그대로 재포장해 주세요.
  
  다음의 경우 교환이 어려울 수 있으며, 반송될 수 있습니다:
  • 상품 사용, 세탁, 훼손, 유실, 택 제거 및 포장 상태 불량
  • 신발 박스를 분실 혹은 훼손
  
  ※ 교환 과정에서 품절이 발생할 경우 반품/환불로 처리될 수 있습니다.`,
  },
  {
    question: "주문한 상품의 배송지 정보를 변경할 수 있나요?",
    answer: `배송지 정보 변경은 배송시작 이전 주문상태에서만 가능합니다.
  
  1. [결제완료] 상태
     • 'MY > 주문배송조회 > 주문상세내역'에서 직접 주소지 변경이 가능합니다.
  
  2. [상품준비중] 상태
     • 직접 주소지 변경이 불가합니다.
     • 변경이 필요한 경우 1:1 문의를 남겨주시면 확인해 드리겠습니다.
  
  3. [배송시작] 상태
     • 주소지 변경이 불가합니다.
  
  ※ 출고 처리 중(상품 포장 및 확인) 단계부터는 주소(옵션) 변경 및 취소가 불가능합니다.`,
  },
  {
    question: "교환(환불)이 어려운 경우가 있나요?",
    answer: `상품 입고 후 검수 결과가 교환/반품 제한 사항에 해당될 경우 교환/환불이 불가하며 고객님께 반송될 수 있습니다.
  
  ■ 교환/반품 제한 사항
  
  1. 주문 제작 상품의 제작이 이미 진행된 경우
  
  2. 고객의 사용, 시간 경과, 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우
  
  3. 세트 상품 일부 사용, 구성품 분실, 취급 부주의로 인한 파손/고장/오염으로 재판매가 불가한 경우
     (단, 세트 상품 중 사용하지 않은 새 상품은 부분 반품 가능)
  
  4. 모니터 해상도 차이로 인한 색상이나 이미지 차이를 이유로 단순 변심 교환/반품 요청
  
  5. 제조사 사정(신모델 출시, 부품 가격 변동 등)에 의한 교환/반품 요청
  
  6. 해외 배송 상품이 세관에 걸려있는 경우 (상품 수령 후 가능)
  
  7. 해외 배송 상품의 가격 변동 사유로 인한 경우`,
  },
];
const Faqs = () => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const handleToggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div>
        <div className="flex justify-center">
          <Badge className="rounded-full px-6 py-2">FAQs</Badge>
        </div>
        <h2 className="mx-auto mt-6 max-w-xl text-center text-6xl font-medium">
          자주 묻는 질문과 <span className="text-lime-400">답변</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-primary/10 p-6"
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleToggle(index)}
              >
                <h3 className="font-medium">{faq.question}</h3>
                <Plus
                  className={cn(
                    "flex-shrink-0 text-lime-400 transition duration-300",
                    selectedIndex === index && "rotate-45",
                  )}
                />
              </div>
              <AnimatePresence>
                {selectedIndex === index && (
                  <motion.div
                    initial={{ height: 0, marginTop: 0 }}
                    animate={{ height: "auto", marginTop: 24 }}
                    exit={{ height: 0, marginTop: 0 }}
                    className={cn("overflow-hidden")}
                  >
                    <p className="whitespace-pre-wrap text-primary/50">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
