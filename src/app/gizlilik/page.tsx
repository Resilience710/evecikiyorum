import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik & KVKK Aydınlatma Metni",
  description: "evecikiyorum'da hangi verilerin işlendiği, nasıl saklandığı ve haklarınız.",
  alternates: { canonical: "/gizlilik" },
  openGraph: {
    type: "website",
    url: "/gizlilik",
    title: "Gizlilik & KVKK Aydınlatma Metni · evecikiyorum",
    description: "evecikiyorum'da hangi verilerin işlendiği, nasıl saklandığı ve haklarınız.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">Yasal</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Gizlilik &amp; KVKK Aydınlatma Metni
      </h1>
      <p className="mt-4 text-ink/60">Son güncelleme: 7 Haziran 2026</p>

      <div className="legal mt-8">
        <h2>1. Veri Sorumlusu</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu
          evecikiyorum’dır (evecikiyorum.com). Sorularınız için:{" "}
          <a href="mailto:iletisim@evecikiyorum.com">iletisim@evecikiyorum.com</a>.
        </p>

        <h2>2. İşlenen Veriler</h2>
        <p>İlan oluşturduğunuzda, sizin <strong>kendi girdiğiniz</strong> şu veriler işlenir:</p>
        <ul>
          <li>İlan başlığı ve açıklaması,</li>
          <li>İsteğe bağlı şehir/semt ve bütçe bilgisi,</li>
          <li>İletişim bilgileriniz: telefon, e-posta, Telegram ve/veya Instagram (en az biri).</li>
        </ul>
        <p>
          Ayrıca spam ve kötüye kullanımı önlemek amacıyla, IP adresiniz <strong>düz metin olarak
          saklanmaz</strong>; yalnızca geri döndürülemez şekilde <strong>şifrelenmiş (hash’lenmiş)
          bir özeti</strong> kısa süreli olarak tutulur.
        </p>

        <h2>3. Verilerin Herkese Açık Olması</h2>
        <div className="border-l-4 border-brick bg-brick/[0.06] px-4 py-3">
          <p className="mb-0">
            İlanınıza eklediğiniz <strong>iletişim bilgileri, ilan sayfasında herkese açık olarak
            yayınlanır</strong> ve internette herkes tarafından görülebilir. Yalnızca paylaşılmasını
            istediğiniz bilgileri girin.
          </p>
        </div>

        <h2>4. İşleme Amaçları ve Hukuki Sebep</h2>
        <ul>
          <li>İlanınızın yayınlanması ve diğer kullanıcıların sizinle iletişime geçebilmesi (açık rızanız / hizmetin ifası),</li>
          <li>Spam, dolandırıcılık ve kötüye kullanımın önlenmesi (meşru menfaat),</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
        </ul>

        <h2>5. Saklama Süresi</h2>
        <p>
          İlanlar ve içerdikleri bilgiler, yayınlanmasından itibaren <strong>30 gün</strong> sonra
          otomatik olarak silinir. Bu süreden önce kaldırılan ilanların verileri de silinir.
        </p>

        <h2>6. Çerezler</h2>
        <p>
          Site, çalışması için gereken asgari teknik veriler dışında sizi takip eden pazarlama
          çerezleri kullanmaz. Yazı tipleri için üçüncü taraf bir font sağlayıcısından (Fontshare)
          yararlanılabilir.
        </p>

        <h2>7. Üçüncü Taraflara Aktarım</h2>
        <p>
          Verilerinizi reklam veya pazarlama amacıyla üçüncü taraflara satmayız/paylaşmayız. İlan
          bilgileriniz, niteliği gereği Site üzerinde herkese açıktır. Yasal zorunluluk halinde
          yetkili mercilerle paylaşım yapılabilir.
        </p>

        <h2>8. KVKK Kapsamındaki Haklarınız</h2>
        <p>KVKK m.11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve kanunda sayılan diğer haklarınızı kullanma hakkınız vardır.</p>
        <ul>
          <li>
            İlanınızın <strong>süresinden önce silinmesini</strong> istiyorsanız,{" "}
            <a href="mailto:iletisim@evecikiyorum.com?subject=Ilan%20silme%20talebi">
              iletisim@evecikiyorum.com
            </a>{" "}
            adresine ilanın bağlantısını göndererek talep edebilirsiniz.
          </li>
        </ul>

        <h2>9. Güvenlik</h2>
        <p>
          Verilerinizi korumak için makul teknik ve idari tedbirleri alırız; ancak internet
          üzerinden yapılan hiçbir iletimin %100 güvenli olmadığını hatırlatırız.
        </p>

        <p className="mt-8">
          Hizmetin geneline ilişkin kurallar için{" "}
          <Link href="/kurallar">Kullanım Şartları</Link> sayfasına bakın.
        </p>
      </div>

      <div className="mt-10">
        <Link href="/" className="btn-ghost">Duvara dön</Link>
      </div>
    </div>
  );
}
