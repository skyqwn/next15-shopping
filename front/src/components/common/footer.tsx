import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-gray-200px-4 h-24 border-t py-4 md:h-32">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-8 flex flex-col justify-between gap-8 lg:flex-row">
          <div>
            <h3 className="mb-4 text-lg font-bold">고객센터 1588-1234</h3>
            <div className="space-y-2 text-sm">
              <p>운영시간 평일 11:00 - 18:00 (토∙일, 공휴일 휴무)</p>
              <p>점심시간 평일 13:00 - 14:00</p>
              <button className="mt-2 rounded-lg border border-gray-300 px-4 py-2 text-sm">
                자주 묻는 질문
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href={"https://github.com/skyqwn"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-full p-3"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </Link>
            <Link
              href={"https://instagram.com/sup_kimba"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-full p-3"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 text-sm lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Link href="#" className="hover:underline">
                회사소개
              </Link>
              <Link href="#" className="hover:underline">
                인재채용
              </Link>
              <Link href="#" className="font-bold hover:underline">
                이용약관
              </Link>
              <Link href="#" className="font-bold hover:underline">
                개인정보처리방침
              </Link>
            </div>
            <div className="space-y-2">
              <p>
                김바 주식회사 · 대표 김병호 · 사업자등록번호 : 123-45-67890 ·
                통신판매업 : 제 2024-서울강남-00000호
              </p>
              <p>
                사업장소재지 : 서울특별시 강남구 테헤란로 123, 45층 (역삼동)
              </p>
            </div>
          </div>
          <div className="space-y-4 lg:text-right">
            <div>
              <h4 className="mb-2 font-bold">김바(주)</h4>
              <p>채무지급보증 안내</p>
              <p className="text-xs">
                당사는 고객님의 현금 결제 금액에 대해 하나은행과 채무지급보증
                계약을 체결하여 안전거래를 보장하고 있습니다.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs">© 2024 KBH Corp.</p>
      </div>
    </footer>
  );
};

export default Footer;
