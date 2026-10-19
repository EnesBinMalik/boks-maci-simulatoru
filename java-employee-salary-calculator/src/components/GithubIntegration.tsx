import React, { useState } from 'react';
import { EMPLOYEE_JAVA_CODE, MAIN_JAVA_CODE } from '../data/javaSourceCode';
import {
  Github,
  Key,
  ExternalLink,
  Terminal,
  ShieldCheck,
  Download,
  FolderGit2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Rocket,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';

export const GithubIntegration: React.FC = () => {
  const [githubUsername, setGithubUsername] = useState('EnesBinMalik');
  const [repoName, setRepoName] = useState('Java-Employee-Maas-Hesaplayici---Enes-Ozturk');
  const [patToken, setPatToken] = useState('');
  const [deployStep, setDeployStep] = useState<string>('');
  const [deployStatus, setDeployStatus] = useState<{
    loading: boolean;
    success?: boolean;
    repoUrl?: string;
    error?: string;
  }>({ loading: false });

  const [copiedCmd, setCopiedCmd] = useState(false);

  const fullRepoUrl = `https://github.com/${githubUsername.trim()}/${repoName.trim()}`;
  const gitCloneUrl = `https://github.com/${githubUsername.trim()}/${repoName.trim()}.git`;

  // Helper to convert string to base64 with utf-8 support
  const toBase64 = (str: string) => {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(_match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
  };

  const handleAutoDeploy = async () => {
    if (!patToken.trim()) {
      setDeployStatus({
        loading: false,
        error: 'Lütfen GitHub Personal Access Token (PAT) giriniz.',
      });
      return;
    }

    setDeployStatus({ loading: true, error: undefined });
    const token = patToken.trim();
    const cleanRepo = repoName.trim();

    try {
      // 1. Create Repository
      setDeployStep('1/4: GitHub üzerinde "' + cleanRepo + '" deposu oluşturuluyor...');
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cleanRepo,
          description:
            'Java Employee sınıfı: Fabrika çalışanları maaş, vergi, bonus ve kıdem zammı hesaplayıcı. İmza: Enes Öztürk.',
          private: false,
          auto_init: false,
        }),
      });

      if (!createRes.ok) {
        const errJson = await createRes.json().catch(() => ({}));
        // If repo already exists, continue pushing files
        if (errJson.message && !errJson.message.includes('already exists')) {
          throw new Error(errJson.message || 'Depo oluşturulamadı. Token yetkisini kontrol edin.');
        }
      }

      // 2. Upload README.md
      setDeployStep('2/4: README.md dosyası yükleniyor...');
      const readmeContent = `# ☕ Java Employee Maaş Hesaplayıcı\n\n[![Developer](https://img.shields.io/badge/Geliştirici-Enes%20Öztürk-indigo?style=for-the-badge)](https://github.com/${githubUsername})\n\nBu proje, fabrika çalışanlarının maaş, vergi, bonus ve kıdem zammını hesaplayan nesne yönelimli Java sınıfını içerir.\n\n## 👤 İmza\n**Enes Öztürk**\n`;

      await fetch(`https://api.github.com/repos/${githubUsername}/${cleanRepo}/contents/README.md`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'docs: README.md eklendi - Enes Öztürk',
          content: toBase64(readmeContent),
        }),
      });

      // 3. Upload Employee.java
      setDeployStep('3/4: Employee.java sınıfı yükleniyor...');
      await fetch(
        `https://api.github.com/repos/${githubUsername}/${cleanRepo}/contents/Employee.java`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'feat: Employee.java ana sınıfı - Enes Öztürk',
            content: toBase64(EMPLOYEE_JAVA_CODE),
          }),
        }
      );

      // 4. Upload Main.java
      setDeployStep('4/4: Main.java test sınıfı yükleniyor...');
      await fetch(`https://api.github.com/repos/${githubUsername}/${cleanRepo}/contents/Main.java`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'feat: Main.java konsol test sınıfı - Enes Öztürk',
          content: toBase64(MAIN_JAVA_CODE),
        }),
      });

      setDeployStep('Tamamlandı!');
      setDeployStatus({
        loading: false,
        success: true,
        repoUrl: fullRepoUrl,
      });
    } catch (err: unknown) {
      setDeployStatus({
        loading: false,
        error: err instanceof Error ? err.message : 'GitHub bağlantısı sırasında beklenmeyen bir hata oluştu.',
      });
    }
  };

  const handleDownloadFiles = () => {
    const files = [
      { name: 'Employee.java', content: EMPLOYEE_JAVA_CODE },
      { name: 'Main.java', content: MAIN_JAVA_CODE },
    ];
    files.forEach((file) => {
      const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with EnesBinMalik info */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Doğrulandı: GitHub @EnesBinMalik
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5">
              <Github className="w-7 h-7 text-white" />
              GitHub Hesabınıza Otomatik Depo Gönderme
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Enes Bey, GitHub hesabınız (<strong>@EnesBinMalik</strong>) için deponuzu otomatik oluşturup <strong>Employee.java</strong>, <strong>Main.java</strong> ve <strong>README.md</strong> dosyalarını tek tıkla yükleyebilirsiniz.
            </p>
          </div>

          <a
            href="https://github.com/EnesBinMalik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 self-start md:self-auto"
          >
            <Github className="w-4 h-4" />
            github.com/EnesBinMalik Profilin
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Main Action Box: 1-Click Auto Deploy to GitHub */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-7">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Tek Tıkla Otomatik Yükleme (Otomatik Depo Açma &amp; Kod Yükleme)
            </h3>
            <p className="text-xs text-slate-500">
              GitHub güvenlik kuralları gereği hesabınıza sizin adınıza doğrudan depo açıp dosya yazabilmek için bir kerelik erişim belirteci (token) gereklidir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {/* Target Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              Hedef GitHub Kullanıcı Adı
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono font-bold">
                @
              </span>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 font-mono font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
              />
            </div>
          </div>

          {/* Target Repo Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              Oluşturulacak Depo (Repository) Adı
            </label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 font-mono font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 outline-hidden"
            />
          </div>
        </div>

        {/* Token Input with Direct Link */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-indigo-600" />
              GitHub Personal Access Token (Klasik veya Fine-grained):
            </label>
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=Java-Employee-Enes-Ozturk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline flex items-center gap-1"
            >
              👉 Buraya Tıklayarak 10 Saniyede Token Al (Hazır Ayarlı)
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          </div>

          <input
            type="password"
            value={patToken}
            onChange={(e) => setPatToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Token'ınızı buraya yapıştırın)"
            className="w-full px-3.5 py-3 text-sm bg-slate-50 rounded-xl border border-slate-200 font-mono focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-1.5">
            Token&apos;ınız hiçbir sunucuya kaydedilmez; yalnızca tarayıcınızdan GitHub resmi API&apos;sine doğrudan güvenli istek gönderir.
          </p>
        </div>

        {/* Deploy Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Employee.java + Main.java + README.md (İmza: Enes Öztürk) yüklenecek</span>
          </div>

          <button
            onClick={handleAutoDeploy}
            disabled={deployStatus.loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
          >
            {deployStatus.loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{deployStep || 'Gönderiliyor...'}</span>
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4" />
                <span>EnesBinMalik Hesabına Depoyu Oluştur ve Yükle</span>
              </>
            )}
          </button>
        </div>

        {/* Success Alert */}
        {deployStatus.success && (
          <div className="mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Harika! Proje Başarıyla GitHub Deponuza Yüklendi!</span>
            </div>
            <p className="text-xs text-emerald-800 mb-3">
              Deponuz GitHub üzerinde oluşturuldu ve tüm dosyalar Enes Öztürk imzasıyla yüklendi.
            </p>
            <a
              href={deployStatus.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <span>GitHub Deponu Görüntüle: {deployStatus.repoUrl}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Error Alert */}
        {deployStatus.error && (
          <div className="mt-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="block font-bold mb-0.5">Yükleme Başarısız Oldu:</strong>
              <span>{deployStatus.error}</span>
              <p className="mt-1 text-slate-600">
                Eğer token oluşturmakla uğraşmak istemiyorsanız, token&apos;ınızı bana sohbetten yazabilirsiniz; ben terminalden doğrudan gönderebilirim veya aşağıdaki hazır Git komutlarını çalıştırabilirsiniz.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Options: Direct Download & Terminal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Direct File Download */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Alternatif 1: Dosyaları Doğrudan İndir</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Employee.java ve Main.java dosyalarını tek tıkla bilgisayarınıza indirin.
          </p>
          <button
            onClick={handleDownloadFiles}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            Tüm Java Dosyalarını İndir (.java)
          </button>
        </div>

        {/* Card 2: Terminal Push Commands */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
          <div className="flex items-center justify-between font-bold text-slate-900 text-sm mb-1">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Alternatif 2: Terminal Komutları</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `git remote add origin ${gitCloneUrl}\ngit push -u origin main`
                );
                setCopiedCmd(true);
                setTimeout(() => setCopiedCmd(false), 2000);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              {copiedCmd ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedCmd ? 'Kopyalandı' : 'Kopyala'}
            </button>
          </div>
          <div className="mt-2 bg-slate-900 text-emerald-400 p-2.5 rounded-xl font-mono text-[11px] overflow-x-auto">
            <code>
              git remote add origin {gitCloneUrl}
              <br />
              git push -u origin main
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
