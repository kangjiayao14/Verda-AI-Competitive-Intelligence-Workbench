import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

/* 飞书式可编辑文本块：编辑模式下双击/点击进入编辑，失焦或回车保存。 */
export function VEditableBlock({
  value,
  editable,
  onSave,
  className = '',
  as = 'p',
}: {
  value: string
  editable: boolean
  onSave: (text: string) => void
  className?: string
  as?: 'p' | 'div'
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      ref.current.style.height = 'auto'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }, [editing])

  function commit() {
    setEditing(false)
    if (draft.trim() !== value.trim()) onSave(draft.trim())
  }
  function cancel() {
    setDraft(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) commit()
            if (e.key === 'Escape') cancel()
          }}
          className="w-full resize-none rounded-card border border-primary/40 bg-primary-tint/20 p-3 text-body leading-relaxed text-ink outline-none focus:border-primary"
        />
        <div className="mt-1.5 flex items-center gap-2">
          <button
            onClick={commit}
            className="inline-flex items-center gap-1 rounded-btn bg-primary px-2.5 h-7 text-tag font-medium text-white hover:bg-primary-deep"
          >
            <Check size={12} /> 保存
          </button>
          <button
            onClick={cancel}
            className="inline-flex items-center gap-1 rounded-btn bg-line/60 px-2.5 h-7 text-tag font-medium text-ink-2 hover:bg-line"
          >
            <X size={12} /> 取消
          </button>
          <span className="text-tag text-ink-3">⌘/Ctrl + Enter 保存 · Esc 取消</span>
        </div>
      </div>
    )
  }

  const Tag = as
  return (
    <Tag
      className={`${className} ${
        editable ? 'cursor-text rounded transition-colors hover:bg-primary-tint/30' : ''
      }`}
      onDoubleClick={() => editable && setEditing(true)}
      title={editable ? '双击编辑' : undefined}
    >
      {value}
    </Tag>
  )
}
