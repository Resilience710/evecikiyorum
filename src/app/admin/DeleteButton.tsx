"use client";

/** Silmeden önce onay soran buton. Server Action'lı form'un içinde kullanılır;
 *  iptal edilirse form gönderimini durdurur. */
export default function DeleteButton({ title }: { title: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        const name = title?.trim() ? `“${title.trim()}” ilanını` : "bu ilanı";
        if (!window.confirm(`${name} kalıcı olarak silmek istediğine emin misin?`)) {
          e.preventDefault();
        }
      }}
      className="btn bg-brick text-paper shadow-[4px_4px_0_0_#141210] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
    >
      Sil
    </button>
  );
}
