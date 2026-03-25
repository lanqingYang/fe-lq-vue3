import { ref } from "vue";
import { defineStore } from "pinia";
import { VALUE_TRANSFER_BUS_KEY } from "@/constants/busKey";
export const useValueTransferStore = defineStore(VALUE_TRANSFER_BUS_KEY, () => {
  // 存储传值
  const transferValue = ref<string | number>('')

  // 修改传值
  function setTransferValue(value: string | number) {
    transferValue.value = value
  }

  return { transferValue, setTransferValue }
})
