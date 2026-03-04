export type CargoType = 'documents' | 'fragile' | 'regular'

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COLLECTING'
  | 'READY_TO_SHIP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'

export interface SenderInfo {
  name: string
  phone: string
  city: string
}

export interface ReceiverInfo {
  name: string
  city: string
  cargoType: CargoType
  weight: number
}

export interface Order {
  id: string
  sender: SenderInfo
  receiver: ReceiverInfo
  status: OrderStatus
  createdAt: string
}

export interface FormDraft {
  step: 1 | 2 | 3
  sender: Partial<SenderInfo>
  receiver: Partial<ReceiverInfo>
}
