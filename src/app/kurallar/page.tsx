import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Şartları & Sorumluluk Reddi",
  description:
    "evecikiyorum kullanım şartları, kuralları ve sorumluluk reddi. Site yalnızca bir ilan panosudur.",
  alternates: { canonical: "/kurallar" },
  openGraph: {
    type: "website",
    url: "/kurallar",
    title: "Kullanım Şartları & Sorumluluk Reddi · evecikiyorum",
    description: "evecikiyorum kullanım şartları, kuralları ve sorumluluk reddi.",
  },
};

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">Yasal</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Kullanım Şartları & Sorumluluk Reddi
      </h1>
      <p className="mt-4 text-ink/60">Son güncelleme: 7 Haziran 2026</p>

      <div className="mt-6 border-[2.5px] border-ink bg-lime px-5 py-4 font-semibold text-ink shadow-hard">
        Özetle: evecikiyorum bir <strong>aracı / ilan panosudur</strong>. İlanları biz oluşturmuyoruz,
        doğrulamıyoruz; ilan sahipleriyle aranızdaki hiçbir şeyin tarafı değiliz ve sonuçlarından
        sorumlu değiliz. Lütfen aşağıdakileri dikkatle okuyun.
      </div>

      <div className="legal mt-8">
        <h2>1. Taraflar ve Kapsam</h2>
        <p>
          Bu Kullanım Şartları (“Şartlar”), <strong>evecikiyorum.com</strong> (“Site”, “evecikiyorum”,
          “biz”) ile Site’yi herhangi bir şekilde kullanan ziyaretçi, ilan veren ve ilanlara yanıt
          veren tüm kişiler (“Kullanıcı”, “siz”) arasındaki ilişkiyi düzenler. Site’ye girerek,
          ilan oluşturarak veya bir ilana yanıt vererek bu Şartları okuduğunuzu, anladığınızı ve
          kabul ettiğinizi beyan edersiniz. Kabul etmiyorsanız Site’yi kullanmayın.
        </p>

        <h2>2. Hizmetin Niteliği — Yalnızca Bir İlan Panosu</h2>
        <p>
          evecikiyorum, ev/oda arkadaşı arayan kişilerin ilan yayınlayabildiği ve bu ilanlara
          ulaşabildiği bir <strong>ilan platformudur</strong>. Site:
        </p>
        <ul>
          <li>İlanların içeriğini <strong>oluşturmaz, denetlemez, düzenlemez ve garanti etmez</strong>.</li>
          <li>İlan sahiplerinin kimliğini, beyanlarını, evin/odanın varlığını veya durumunu doğrulamaz.</li>
          <li>Kullanıcılar arasında <strong>emlakçı, komisyoncu, kefil, aracı kurum veya taraf</strong> değildir.</li>
          <li>Hiçbir kira, depozito, ödeme veya sözleşme işlemine taraf olmaz, bunları yönetmez.</li>
        </ul>
        <p>
          Site üzerindeki tüm içerikler <strong>tamamen ilanı oluşturan Kullanıcıya aittir</strong>
          ve onun sorumluluğundadır.
        </p>

        <h2>3. Üyelik Yok</h2>
        <p>
          Site’de kayıt veya giriş sistemi yoktur. İlan oluşturmak için hesap açmanıza gerek
          yoktur. Bunun bir sonucu olarak:
        </p>
        <ul>
          <li>
            İlanlar, oluşturulduktan sonra <strong>belirli bir süre (varsayılan 30 gün) sonunda
            otomatik olarak silinir</strong>.
          </li>
          <li>
            Üyelik olmadığı için ilan veren kişi ilanını <strong>sonradan kendisi
            düzenleyemez/silemez</strong>; ilan, süresi dolana kadar veya yönetici tarafından
            kaldırılana kadar yayında kalır. Bu nedenle ilan oluştururken bilgilerinizi dikkatle
            girin.
          </li>
        </ul>

        <h2>4. İlan Verirken Kurallarınız</h2>
        <p>İlan oluşturan Kullanıcı aşağıdakileri kabul eder:</p>
        <ul>
          <li>Verdiğiniz tüm bilgilerin <strong>doğru, güncel ve yanıltıcı olmadığını</strong>.</li>
          <li>
            Paylaştığınız iletişim bilgilerinin (telefon, e-posta, Telegram, Instagram)
            <strong> herkese açık olarak yayınlanacağını</strong> ve bunu kendi rızanızla
            paylaştığınızı.
          </li>
          <li>Başkasına ait iletişim/kişisel bilgileri onun rızası olmadan paylaşmayacağınızı.</li>
          <li>18 yaşından büyük olduğunuzu ve hukuki olarak ehil olduğunuzu.</li>
          <li>İlan içeriğinin yürürlükteki mevzuata aykırı olmadığını.</li>
        </ul>

        <h2>5. Yasak İçerik ve Davranışlar</h2>
        <p>Aşağıdakiler kesinlikle yasaktır:</p>
        <ul>
          <li>Dolandırıcılık, sahte ilan, yanıltıcı veya gerçek dışı içerik.</li>
          <li>Hakaret, küfür, nefret söylemi, ayrımcılık (ırk, din, cinsiyet, etnik köken vb.).</li>
          <li>
            Cinsel içerik, fuhuş ima eden ilanlar, taciz; ev/oda arkadaşlığı dışında amaçlar.
          </li>
          <li>Yasadışı mal/hizmet, uyuşturucu, kumar, silah vb. ile ilgili her türlü içerik.</li>
          <li>Spam, reklam, toplu/otomatik (bot) ilan, aynı ilanı tekrar tekrar yayınlama.</li>
          <li>Başkalarının fikri mülkiyet veya kişilik haklarını ihlal eden içerik.</li>
          <li>Para/ön ödeme/depozito talebiyle yapılan şüpheli yönlendirmeler.</li>
        </ul>
        <p>
          Bu kurallara aykırı ilanlar, önceden bildirim yapılmaksızın kaldırılabilir.
        </p>

        <h2 id="sorumluluk">6. Sorumluluğun Reddi (Önemli)</h2>
        <p>
          Site’yi “<strong>olduğu gibi</strong>” ve “<strong>mevcut haliyle</strong>” sunuyoruz.
          Yürürlükteki mevzuatın izin verdiği en geniş ölçüde:
        </p>
        <ul>
          <li>
            İlanların doğruluğu, güncelliği, kalitesi, güvenilirliği veya yasallığı konusunda
            <strong> hiçbir garanti vermeyiz</strong>.
          </li>
          <li>
            Kullanıcılar arasında kurulan iletişim, görüşme, anlaşma, kira sözleşmesi, ödeme,
            depozito, birlikte yaşam ve bunların <strong>tüm sonuçlarından evecikiyorum sorumlu
            değildir</strong>.
          </li>
          <li>
            Dolandırıcılık, hırsızlık, maddi/manevi zarar, veri kaybı, taciz, anlaşmazlık,
            kazanç kaybı veya doğrudan/dolaylı hiçbir zarardan <strong>sorumlu tutulamayız</strong>.
          </li>
          <li>
            Kullanıcıların birbirine karşı eylem ve beyanlarından, ilanların içeriğinden veya
            ilan sonrası yaşanan hiçbir olaydan sorumluluğumuz yoktur.
          </li>
          <li>
            Site’nin kesintisiz, hatasız veya her zaman erişilebilir olacağını garanti etmeyiz.
          </li>
        </ul>
        <p>
          İlanlara güvenmek ve onlara göre hareket etmek <strong>tamamen sizin kendi
          riskinizdedir</strong>. Tüm sorumluluk, ilanı veren ve ilana yanıt veren Kullanıcılara
          aittir.
        </p>

        <h2>7. Güvenlik Önerileri</h2>
        <ul>
          <li>Tanımadığınız kişilere <strong>asla önceden para/depozito göndermeyin</strong>.</li>
          <li>Evi/odayı görmeden, yüz yüze görüşmeden anlaşma yapmayın.</li>
          <li>İlk buluşmayı gündüz ve kalabalık/güvenli bir yerde yapın; yakınınızı haberdar edin.</li>
          <li>Kimlik, banka veya hassas bilgilerinizi paylaşmayın.</li>
          <li>“Çok ucuz”, “acele”, “kapora yatır” gibi baskı kuran ilanlara şüpheyle yaklaşın.</li>
        </ul>

        <h2>8. Fikri Mülkiyet</h2>
        <p>
          Site’nin tasarımı, logosu ve yazılımı bize aittir. İlan içeriklerinin hak sahibi ise onu
          oluşturan Kullanıcıdır; ilan yayınlayarak içeriğinizin Site’de gösterilmesine izin
          vermiş olursunuz.
        </p>

        <h2>9. İçeriğin Kaldırılması</h2>
        <p>
          Herhangi bir ilanı, gerekçe göstermeksizin ve önceden bildirim yapmaksızın yayından
          kaldırma hakkımız saklıdır. Süresi dolan ilanlar otomatik olarak silinir.
        </p>

        <h2 id="bildir">10. Uygunsuz İlan Bildirimi</h2>
        <p>
          Kurallara aykırı, sahte veya uygunsuz bir ilanla karşılaşırsanız bize bildirin; en kısa
          sürede inceleriz. Bildirim için{" "}
          <a href="mailto:iletisim@evecikiyorum.com?subject=Uygunsuz%20ilan%20bildirimi">
            iletisim@evecikiyorum.com
          </a>{" "}
          adresine ilanın bağlantısını ve kısa bir açıklama gönderebilirsiniz.
        </p>

        <h2>11. Değişiklikler ve Uygulanacak Hukuk</h2>
        <p>
          Bu Şartları zaman zaman güncelleyebiliriz; güncel sürüm her zaman bu sayfada yer alır.
          Site’yi kullanmaya devam etmeniz, güncel Şartları kabul ettiğiniz anlamına gelir. Bu
          Şartlar Türkiye Cumhuriyeti hukukuna tabidir ve uyuşmazlıklarda Türkiye mahkemeleri ve
          icra daireleri yetkilidir.
        </p>

        <p className="mt-8">
          Gizlilik ve kişisel verilerle ilgili bilgi için{" "}
          <Link href="/gizlilik">Gizlilik &amp; KVKK Aydınlatma Metni</Link> sayfasına bakın.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/?yeniilan=1" className="btn-primary">Kuralları kabul ediyorum, ilan as</Link>
        <Link href="/" className="btn-ghost">Duvara dön</Link>
      </div>
    </div>
  );
}
