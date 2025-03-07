"use client";

import { useCartStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CartUserInfo = () => {
  const { setCheckoutProgress, setUserInfo, userInfo } = useCartStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shippingAddress: "",
    detailAddress: "",
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const [baseAddress, detailAddress = ""] =
        userInfo.shippingAddress.split(" | ");
      setFormData({
        name: userInfo.name,
        phone: userInfo.phone,
        shippingAddress: baseAddress,
        detailAddress,
      });
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      // 도로명 주소
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFormData((prev) => ({
      ...prev,
      shippingAddress: fullAddress,
      detailAddress: "",
    }));
    setIsAddressModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullShippingAddress = formData.detailAddress
      ? `${formData.shippingAddress} | ${formData.detailAddress}`
      : formData.shippingAddress;
    setUserInfo({
      name: formData.name,
      phone: formData.phone,
      shippingAddress: fullShippingAddress,
    });
    setCheckoutProgress("payment-page");
  };

  const handleBack = () => {
    setCheckoutProgress("cart-page");
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h2 className="mb-4 text-lg font-bold">배송 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">받으시는 분</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">받으시는 분 연락처</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="연락처를 입력하세요 (예: 010-1234-5678)"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="shippingAddress">배송지 주소</Label>
          <div className="flex gap-2">
            <Input
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              readOnly
              placeholder="주소를 검색하세요"
              className="flex-1"
            />
            <Dialog
              open={isAddressModalOpen}
              onOpenChange={setIsAddressModalOpen}
            >
              <DialogTrigger asChild>
                <Button type="button">주소 검색</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>주소 검색</DialogTitle>
                </DialogHeader>
                <DaumPostcode onComplete={handleAddressComplete} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="detailAddress">상세 주소</Label>
          <Input
            id="detailAddress"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleChange}
            placeholder="상세 주소를 입력하세요 (예: 101동 101호)"
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack}>
            뒤로
          </Button>
          <Button type="submit">다음</Button>
        </div>
      </form>
    </div>
  );
};

export default CartUserInfo;
