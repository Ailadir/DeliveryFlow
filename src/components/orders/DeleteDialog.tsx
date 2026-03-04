'use client'

import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

interface DeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDialog({ open, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text">Удалить заявку?</h3>
          <p className="mt-1 text-sm text-text/60">
            Это действие нельзя отменить. Заявка будет удалена навсегда.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Удалить
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
