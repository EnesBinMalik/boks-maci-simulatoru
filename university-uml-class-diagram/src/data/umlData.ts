import { UMLClass, UMLRelationship, RuleAnalysis, QuizQuestion, LayoutPreset } from '../types/uml';

export const INITIAL_CLASSES: UMLClass[] = [
  {
    id: 'universite',
    name: 'Üniversite',
    turkishName: 'Üniversite',
    description: 'Sistemin tepe çatı kurumu. Bünyesinde departmanları, sınıflıkları, çalışma ofislerini ve çalışanları barındırır.',
    category: 'core',
    x: 480,
    y: 60,
    width: 220,
    height: 90,
    sampleAttributes: ['- ad: String', '- kurulusYili: int', '- rektor: String'],
    sampleMethods: ['+ departmanEkle(d: Departman)', '+ personelAl(c: Calisan)']
  },
  {
    id: 'siniflik',
    name: 'Sınıflık',
    turkishName: 'Sınıflık (Derslik)',
    description: 'Üniversiteye ait derslik ve amfiler. Üniversite varlığına sıkı sıkıya bağlıdır (Bileşim - Composition).',
    category: 'location',
    x: 100,
    y: 260,
    width: 200,
    height: 90,
    sampleAttributes: ['- kod: String', '- kapasite: int', '- projeksiyonVarMi: boolean'],
    sampleMethods: ['+ dersAta()', '+ musaitlikKontrolEt()']
  },
  {
    id: 'departman',
    name: 'Departman',
    turkishName: 'Departman',
    description: 'Üniversiteye ait akademik veya idari birimler (Örn: Bilgisayar Mühendisliği). Kendisine bağlı çalışma ofisleri bulunur.',
    category: 'structure',
    x: 480,
    y: 260,
    width: 220,
    height: 90,
    sampleAttributes: ['- ad: String', '- bolumKodu: String'],
    sampleMethods: ['+ ofisEkle(o: CalismaOfisi)', '+ ofisleriListele()']
  },
  {
    id: 'calisma_ofisi',
    name: 'ÇalışmaOfisi',
    turkishName: 'Çalışma Ofisi',
    description: 'Üniversite yerleşkesinde yer alan ve departmanlara tahsis edilen ofisler. Çalışanlar bu ofislerde görev yapar.',
    category: 'location',
    x: 480,
    y: 470,
    width: 220,
    height: 90,
    sampleAttributes: ['- odaNo: String', '- kat: int', '- masaSayisi: int'],
    sampleMethods: ['+ calisanAta(c: Calisan)', '+ bosYerVarMi(): boolean']
  },
  {
    id: 'calisan',
    name: 'Çalışan',
    turkishName: 'Çalışan (Superclass)',
    stereotype: 'abstract',
    description: 'Üniversiteye ait tüm personeli temsil eden soyut üst sınıf. Her çalışan bir ofiste çalışır.',
    category: 'actor',
    x: 880,
    y: 260,
    width: 210,
    height: 90,
    sampleAttributes: ['# tcNo: String', '# adSoyad: String', '# sicilNo: String'],
    sampleMethods: ['+ ofiseYerles(o: CalismaOfisi)', '+ gorevYap()*']
  },
  {
    id: 'profesor',
    name: 'Profesör',
    turkishName: 'Profesör (Subclass)',
    description: 'Çalışan sınıfından türeyen akademik personel (Kalıtım / Genelleme). Ders verir ve araştırma yürütür.',
    category: 'actor',
    x: 770,
    y: 470,
    width: 190,
    height: 90,
    sampleAttributes: ['- unvan: String', '- uzmanlikAlani: String'],
    sampleMethods: ['+ dersVer()', '+ arastirmaYap()']
  },
  {
    id: 'memur',
    name: 'Memur',
    turkishName: 'Memur (Subclass)',
    description: 'Çalışan sınıfından türeyen idari personel (Kalıtım / Genelleme). Üniversite büro ve evrak işlerini yürütür.',
    category: 'actor',
    x: 1000,
    y: 470,
    width: 190,
    height: 90,
    sampleAttributes: ['- birim: String', '- dahiliTelefon: String'],
    sampleMethods: ['+ evrakIsle()', '+ kayitYap()']
  }
];

export const INITIAL_RELATIONSHIPS: UMLRelationship[] = [
  {
    id: 'rel_uni_siniflik',
    sourceId: 'universite',
    targetId: 'siniflik',
    type: 'composition',
    sourceMultiplicity: '1',
    targetMultiplicity: '1..*',
    label: '',
    ruleNumber: 1,
    ruleDescription: '1 - Üniversiteye ait sınıflıklar vardır.',
    detailedRationale: 'Sınıflıklar doğrudan üniversitenin fiziksel ve yapısal varlığına aittir. Üniversite kapandığında sınıflık bağımsız bir derslik niteliğini yitirir, bu nedenle güçlü sahiplik (Composition / Bileşim) tercih edilir.'
  },
  {
    id: 'rel_uni_departman',
    sourceId: 'universite',
    targetId: 'departman',
    type: 'composition',
    sourceMultiplicity: '1',
    targetMultiplicity: '1..*',
    label: '',
    ruleNumber: 1,
    ruleDescription: '1 - Üniversiteye ait departmanlar vardır.',
    detailedRationale: 'Departmanlar üniversitenin idari ve akademik parçalarıdır. Üniversiteden bağımsız tek başlarına var olamazlar (Bileşim - Composition).'
  },
  {
    id: 'rel_uni_calismaofisi',
    sourceId: 'universite',
    targetId: 'calisma_ofisi',
    type: 'composition',
    sourceMultiplicity: '1',
    targetMultiplicity: '1..*',
    label: '',
    ruleNumber: 1,
    ruleDescription: '1 - Üniversiteye ait çalışma ofisleri vardır.',
    detailedRationale: 'Yerleşkedeki tüm çalışma ofisleri ana mülkiyet ve bina olarak üniversiteye aittir (Bileşim - Composition).'
  },
  {
    id: 'rel_dept_calismaofisi',
    sourceId: 'departman',
    targetId: 'calisma_ofisi',
    type: 'aggregation',
    sourceMultiplicity: '1',
    targetMultiplicity: '1..*',
    label: 'ait',
    ruleNumber: 2,
    ruleDescription: '2 - Departmanlara ait ofisler vardır.',
    detailedRationale: 'Departmanlar bünyelerindeki ofisleri kullanır. Ofis bir departmandan alınıp başka departmana verilebilir veya üniversite bünyesinde kalabilir. Bu nedenle zayıf sahiplik (Kümeleme - Aggregation) kullanılır.'
  },
  {
    id: 'rel_uni_calisan',
    sourceId: 'universite',
    targetId: 'calisan',
    type: 'aggregation',
    sourceMultiplicity: '1',
    targetMultiplicity: '1..*',
    label: 'istihdam eder',
    ruleNumber: 3,
    ruleDescription: '3 - Üniversiteye ait çalışanlar vardır.',
    detailedRationale: 'Çalışanlar üniversitede görev yapar ancak bir birey olarak üniversiteden bağımsız yaşarlar; üniversite kapansa dahi çalışan insan olarak var olmaya devam eder (Kümeleme - Aggregation).'
  },
  {
    id: 'rel_prof_calisan',
    sourceId: 'profesor',
    targetId: 'calisan',
    type: 'generalization',
    ruleNumber: 3,
    ruleDescription: '3 - Bu çalışanlar profesör veya memur olabilir.',
    detailedRationale: 'Profesör "bir" Çalışandır (IS-A ilişkisi). Çalışan sınıfının tüm niteliklerini kalıtır (Kalıtım / Genelleme - Generalization).'
  },
  {
    id: 'rel_memur_calisan',
    sourceId: 'memur',
    targetId: 'calisan',
    type: 'generalization',
    ruleNumber: 3,
    ruleDescription: '3 - Bu çalışanlar profesör veya memur olabilir.',
    detailedRationale: 'Memur "bir" Çalışandır (IS-A ilişkisi). Çalışan sınıfının tüm niteliklerini kalıtır (Kalıtım / Genelleme - Generalization).'
  },
  {
    id: 'rel_calisan_calismaofisi',
    sourceId: 'calisan',
    targetId: 'calisma_ofisi',
    type: 'association',
    sourceMultiplicity: '0..*',
    targetMultiplicity: '1',
    label: 'çalışır',
    ruleNumber: 4,
    ruleDescription: '4 - Her çalışan bir ofiste çalışır.',
    detailedRationale: 'Kural 4 gereğince her çalışan tam olarak 1 ofise atanır (Hedef kardinalite: 1). Bir çalışma ofisinde ise birden fazla çalışan çalışabilir veya henüz boş olabilir (Kaynak kardinalite: 0..* veya 1..*).'
  }
];

export const RULES_ANALYSIS: RuleAnalysis[] = [
  {
    ruleNumber: 1,
    promptText: '1 - Üniversiteye ait sınıflıklar, çalışma ofisleri ve departmanlar vardır.',
    umlConcept: 'Bileşim (Composition - Dolu Eşkenar Dörtgen ◆)',
    involvedClasses: ['Üniversite', 'Sınıflık', 'ÇalışmaOfisi', 'Departman'],
    involvedRelationships: ['rel_uni_siniflik', 'rel_uni_departman', 'rel_uni_calismaofisi'],
    explanation: 'Üniversite üst çatı nesnedir ("whole-part"). Sınıflıklar, departmanlar ve ofisler üniversitenin yaşam döngüsüne sıkı sıkıya bağlıdır. Üniversite var oldukça bu birimler anlam kazanır.',
    technicalNote: 'UML Standardında Üniversite tarafına siyah dolu eşkenar dörtgen (◆) konur. Kardinalite Üniversite: 1, alt birimler: 1..* şeklindedir.'
  },
  {
    ruleNumber: 2,
    promptText: '2 - Departmanlara ait ofisler vardır.',
    umlConcept: 'Kümeleme (Aggregation - Boş Eşkenar Dörtgen ◇)',
    involvedClasses: ['Departman', 'ÇalışmaOfisi'],
    involvedRelationships: ['rel_dept_calismaofisi'],
    explanation: 'Departmanlar kendi bünyelerine tahsis edilmiş ofislere sahiptir. Bir ofis bir departmana bağlıdır ancak fiziki olarak üniversite binasında yer alır. Departman kapatılsa dahi ofis alanı başka departmana aktarılabilir.',
    technicalNote: 'Departman tarafında içi boş beyaz eşkenar dörtgen (◇) bulunur. Kardinalite Departman: 1, Ofis: 1..* olarak modellenir.'
  },
  {
    ruleNumber: 3,
    promptText: '3 - Üniversiteye ait çalışanlar vardır. Bu çalışanlar profesör veya memur olabilir.',
    umlConcept: 'Genelleme / Kalıtım (Generalization / Inheritance —▷) & Kümeleme',
    involvedClasses: ['Üniversite', 'Çalışan', 'Profesör', 'Memur'],
    involvedRelationships: ['rel_uni_calisan', 'rel_prof_calisan', 'rel_memur_calisan'],
    explanation: 'Çalışan üst sınıftır (Superclass). "Profesör" ve "Memur" sınıfları Çalışan sınıfından kalıtım (IS-A) yoluyla türer. Ayrıca Üniversite ile Çalışan arasında çalışanların üniversiteye aidiyetini belirten ilişki mevcuttur.',
    technicalNote: 'Profesör ve Memur kutularından Çalışan kutusuna doğru ucu kapalı içi boş üçgen ok (—▷) çizilir. Çalışan soyut (<<abstract>>) veya somut modellenebilir.'
  },
  {
    ruleNumber: 4,
    promptText: '4 - Her çalışan bir ofiste çalışır.',
    umlConcept: 'İlişki (Association ——) & Bire-Çok Kardinalite',
    involvedClasses: ['Çalışan', 'ÇalışmaOfisi'],
    involvedRelationships: ['rel_calisan_calismaofisi'],
    explanation: 'Çalışan ile Çalışma Ofisi arasında işlevsel bir iş ilişkisi vardır. Kural net olarak "Her çalışan bir ofiste çalışır" dediğinden ÇalışmaOfisi ucundaki kardinalite tam olarak 1 (veya 1..1) olmalıdır. Bir ofiste birden fazla çalışan bulunabileceği için Çalışan ucundaki kardinalite 0..* veya 1..* olur.',
    technicalNote: 'Çizgi üzerine "çalışır" eylem etiketi yerleştirilir. Çift yönlü veya Çalışan->Ofis yönlü navigasyon sağlanır.'
  }
];

export const LAYOUT_PRESETS: Record<LayoutPreset, Record<string, { x: number; y: number }>> = {
  hierarchical: {
    universite: { x: 480, y: 50 },
    siniflik: { x: 80, y: 240 },
    departman: { x: 480, y: 240 },
    calisan: { x: 890, y: 240 },
    calisma_ofisi: { x: 480, y: 470 },
    profesor: { x: 770, y: 470 },
    memur: { x: 1010, y: 470 }
  },
  horizontal: {
    universite: { x: 100, y: 260 },
    siniflik: { x: 420, y: 80 },
    departman: { x: 420, y: 260 },
    calisma_ofisi: { x: 750, y: 260 },
    calisan: { x: 750, y: 460 },
    profesor: { x: 1080, y: 370 },
    memur: { x: 1080, y: 540 }
  },
  clustered: {
    universite: { x: 500, y: 60 },
    departman: { x: 280, y: 250 },
    siniflik: { x: 720, y: 250 },
    calisma_ofisi: { x: 280, y: 470 },
    calisan: { x: 720, y: 440 },
    profesor: { x: 580, y: 620 },
    memur: { x: 860, y: 620 }
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Profesör ve Memur sınıfları ile Çalışan sınıfı arasındaki UML ilişki türü hangisidir?',
    options: [
      'Bileşim (Composition)',
      'Genelleme / Kalıtım (Generalization / Inheritance)',
      'Bağımlılık (Dependency)',
      'Kümeleme (Aggregation)'
    ],
    correctIndex: 1,
    explanation: 'Profesör ve Memur, Çalışan üst sınıfından türeyen özelleşmiş alt sınıflardır ("IS-A" ilişkisi). Bu durum UML\'de içi boş üçgen okla Genelleme (Generalization) olarak gösterilir.',
    ruleNumber: 3
  },
  {
    id: 2,
    question: '"Her çalışan bir ofiste çalışır" kuralına göre Çalışma Ofisi ucundaki çoğulluk (kardinalite) ne olmalıdır?',
    options: [
      '0..*',
      '1..*',
      '1 (veya 1..1)',
      '*'
    ],
    correctIndex: 2,
    explanation: '"Her çalışan bir ofiste çalışır" ifadesi, bir çalışanın zorunlu olarak tam 1 ofise atanmış olduğunu belirtir. Bu nedenle Çalışma Ofisi tarafındaki kardinalite "1" olmalıdır.',
    ruleNumber: 4
  },
  {
    id: 3,
    question: 'Üniversite ile Sınıflık arasındaki ilişki neden Bileşim (Composition) olarak modellenir?',
    options: [
      'Sınıflıklar üniversite kapansa bile kendi başına bağımsız bir tüzel kişilik oluşturur.',
      'Sınıflıklar üniversitenin parçasıdır ve üniversite olmaksızın derslik niteliklerini sürdüremezler (Güçlü Sahiplik).',
      'Sınıflıklar çalışanları yönetir.',
      'Sınıflık bir arayüzdür (interface).'
    ],
    correctIndex: 1,
    explanation: 'Bileşim (Composition), parçanın yaşam döngüsünün bütüne sıkı sıkıya bağlı olduğu durumları temsil eder (Dolu siyah elmas ◆).',
    ruleNumber: 1
  },
  {
    id: 4,
    question: 'Departman ile Çalışma Ofisi arasındaki ilişkiyi gösteren UML sembolü hangisidir?',
    options: [
      'Departman tarafında içi boş eşkenar dörtgen (◇ - Aggregation)',
      'Departman tarafında içi dolu eşkenar dörtgen (◆ - Composition)',
      'Kesikli ok (- - - > - Dependency)',
      'İçi boş üçgen ok (—▷ - Generalization)'
    ],
    correctIndex: 0,
    explanation: 'Departman ofislere sahiptir ancak ofisler üniversite mülküdür ve departmanlar arası yeniden tahsis edilebilir. Zayıf sahiplik içi boş elmas (Aggregation ◇) ile gösterilir.',
    ruleNumber: 2
  }
];

export function generatePlantUML(): string {
  return `@startuml Universite_Sinif_Diyagrami
' ============================================================
' Üniversite Sistemi UML Sınıf Diyagramı
' Hazırlayan: Enes Öztürk
' ============================================================

title Üniversite Sistemi UML Sınıf Diyagramı\\nHazırlayan: Enes Öztürk

skinparam classAttributeIconSize 0
skinparam monochrome false
skinparam roundcorner 8

class Üniversite {
}

class Sınıflık {
}

class Departman {
}

class ÇalışmaOfisi {
}

abstract class Çalışan {
}

class Profesör {
}

class Memur {
}

' 1 - Üniversiteye ait sınıflıklar, çalışma ofisleri ve departmanlar vardır.
Üniversite "1" *-- "1..*" Sınıflık : içerir
Üniversite "1" *-- "1..*" Departman : içerir
Üniversite "1" *-- "1..*" ÇalışmaOfisi : barındırır

' 2 - Departmanlara ait ofisler vardır.
Departman "1" o-- "1..*" ÇalışmaOfisi : aittir

' 3 - Üniversiteye ait çalışanlar vardır. Bu çalışanlar profesör veya memur olabilir.
Üniversite "1" o-- "1..*" Çalışan : istihdam eder
Çalışan <|-- Profesör : <<extends>>
Çalışan <|-- Memur : <<extends>>

' 4 - Her çalışan bir ofiste çalışır.
Çalışan "0..*" -- "1" ÇalışmaOfisi : çalışır >

@enduml`;
}

export function generateMermaid(): string {
  return `classDiagram
    direction TB
    %% ==========================================
    %% Üniversite Sistemi UML Sınıf Diyagramı
    %% Hazırlayan: Enes Öztürk
    %% ==========================================

    class Üniversite
    class Sınıflık
    class Departman
    class ÇalışmaOfisi
    class Çalışan {
        <<abstract>>
    }
    class Profesör
    class Memur

    %% Madde 1: Üniversiteye ait sınıflıklar, ofisler ve departmanlar vardır (Bileşim)
    Üniversite "1" *-- "1..*" Sınıflık : içerir
    Üniversite "1" *-- "1..*" Departman : içerir
    Üniversite "1" *-- "1..*" ÇalışmaOfisi : barındırır

    %% Madde 2: Departmanlara ait ofisler vardır (Kümeleme)
    Departman "1" o-- "1..*" ÇalışmaOfisi : tahsis

    %% Madde 3: Çalışanlar profesör veya memur olabilir (Kalıtım)
    Üniversite "1" o-- "1..*" Çalışan : çalıştırır
    Çalışan <|-- Profesör : miras
    Çalışan <|-- Memur : miras

    %% Madde 4: Her çalışan bir ofiste çalışır (İlişki)
    Çalışan "0..*" -- "1" ÇalışmaOfisi : çalışır`;
}

export function generatePythonCode(): string {
  return `# ============================================================
# Üniversite Sistemi Nesne Yönelimli Tasarım (Python)
# Hazırlayan: Enes Öztürk
# ============================================================

from abc import ABC, abstractmethod
from typing import List, Optional

class CalismaOfisi:
    def __init__(self, oda_no: str, kat: int):
        self.oda_no = oda_no
        self.kat = kat
        self.calisanlar: List['Calisan'] = []

    def calisan_ekle(self, calisan: 'Calisan'):
        self.calisanlar.append(calisan)

class Calisan(ABC):
    """Madde 3: Üniversiteye ait çalışanlar için soyut üst sınıf."""
    def __init__(self, ad_soyad: str, sicil_no: str, ofis: CalismaOfisi):
        self.ad_soyad = ad_soyad
        self.sicil_no = sicil_no
        # Madde 4: Her çalışan bir ofiste çalışır (Zorunlu 1 ofis)
        self.ofis = ofis
        self.ofis.calisan_ekle(self)

    @abstractmethod
    def gorev_yap(self):
        pass

class Profesor(Calisan):
    """Madde 3: Çalışan sınıfından türeyen Profesör alt sınıfı."""
    def __init__(self, ad_soyad: str, sicil_no: str, ofis: CalismaOfisi, unvan: str):
        super().__init__(ad_soyad, sicil_no, ofis)
        self.unvan = unvan

    def gorev_yap(self):
        print(f"{self.unvan} {self.ad_soyad} ders veriyor ve araştırma yapıyor.")

class Memur(Calisan):
    """Madde 3: Çalışan sınıfından türeyen Memur alt sınıfı."""
    def __init__(self, ad_soyad: str, sicil_no: str, ofis: CalismaOfisi, birim: str):
        super().__init__(ad_soyad, sicil_no, ofis)
        self.birim = birim

    def gorev_yap(self):
        print(f"Memur {self.ad_soyad} {self.birim} idari işlerini yürütüyor.")

class Siniflik:
    """Madde 1: Üniversiteye ait sınıflık."""
    def __init__(self, kod: str, kapasite: int):
        self.kod = kod
        self.kapasite = kapasite

class Departman:
    """Madde 1 ve 2: Departman ve departmana ait ofisler."""
    def __init__(self, ad: str):
        self.ad = ad
        # Madde 2: Departmanlara ait ofisler vardır
        self.ofisler: List[CalismaOfisi] = []

    def ofis_ekle(self, ofis: CalismaOfisi):
        self.ofisler.append(ofis)

class Universite:
    """Madde 1: Sınıflıklar, çalışma ofisleri ve departmanlar üniversiteye aittir."""
    def __init__(self, ad: str):
        self.ad = ad
        self.sinifliklar: List[Siniflik] = []
        self.departmanlar: List[Departman] = []
        self.calisma_ofisleri: List[CalismaOfisi] = []
        self.calisanlar: List[Calisan] = []
`;
}

export function generateJavaCode(): string {
  return `/**
 * Üniversite Sistemi Nesne Yönelimli Tasarım (Java)
 * Hazırlayan: Enes Öztürk
 */

import java.util.ArrayList;
import java.util.List;

// Madde 4: Çalışma Ofisi
class CalismaOfisi {
    private String odaNo;
    private int kat;
    private List<Calisan> calisanlar = new ArrayList<>();

    public CalismaOfisi(String odaNo, int kat) {
        this.odaNo = odaNo;
        this.kat = kat;
    }

    public void calisanEkle(Calisan c) {
        this.calisanlar.add(c);
    }
}

// Madde 3: Üst Sınıf (Superclass)
abstract class Calisan {
    protected String adSoyad;
    protected String sicilNo;
    // Madde 4: Her çalışan bir ofiste çalışır
    protected CalismaOfisi ofis;

    public Calisan(String adSoyad, String sicilNo, CalismaOfisi ofis) {
        this.adSoyad = adSoyad;
        this.sicilNo = sicilNo;
        this.ofis = ofis;
        this.ofis.calisanEkle(this);
    }

    public abstract void gorevYap();
}

// Madde 3: Profesör Alt Sınıfı
class Profesor extends Calisan {
    private String unvan;

    public Profesor(String adSoyad, String sicilNo, CalismaOfisi ofis, String unvan) {
        super(adSoyad, sicilNo, ofis);
        this.unvan = unvan;
    }

    @Override
    public void gorevYap() {
        System.out.println(unvan + " " + adSoyad + " ders veriyor.");
    }
}

// Madde 3: Memur Alt Sınıfı
class Memur extends Calisan {
    private String birim;

    public Memur(String adSoyad, String sicilNo, CalismaOfisi ofis, String birim) {
        super(adSoyad, sicilNo, ofis);
        this.birim = birim;
    }

    @Override
    public void gorevYap() {
        System.out.println("Memur " + adSoyad + " evrakları düzenliyor.");
    }
}

// Madde 1: Sınıflık
class Siniflik {
    private String kod;
    private int kapasite;

    public Siniflik(String kod, int kapasite) {
        this.kod = kod;
        this.kapasite = kapasite;
    }
}

// Madde 1 & 2: Departman ve ofisleri
class Departman {
    private String ad;
    private List<CalismaOfisi> ofisler = new ArrayList<>();

    public Departman(String ad) {
        this.ad = ad;
    }

    public void ofisEkle(CalismaOfisi ofis) {
        this.ofisler.add(ofis);
    }
}

// Madde 1: Üniversite (Bileşim - Composition)
public class Universite {
    private String ad;
    private List<Siniflik> sinifliklar = new ArrayList<>();
    private List<Departman> departmanlar = new ArrayList<>();
    private List<CalismaOfisi> calismaOfisleri = new ArrayList<>();
    private List<Calisan> calisanlar = new ArrayList<>();

    public Universite(String ad) {
        this.ad = ad;
    }
}
`;
}

export function generateTypeScriptCode(): string {
  return `/**
 * Üniversite Sistemi UML Sınıf Diyagramı Karşılığı
 * Hazırlayan: Enes Öztürk
 */

export class CalismaOfisi {
  constructor(
    public odaNo: string,
    public kat: number,
    public calisanlar: Calisan[] = []
  ) {}

  calisanAta(c: Calisan): void {
    this.calisanlar.push(c);
  }
}

// Madde 3: Soyut Üst Sınıf
export abstract class Calisan {
  constructor(
    public adSoyad: string,
    public sicilNo: string,
    // Madde 4: Her çalışan bir ofiste çalışır
    public ofis: CalismaOfisi
  ) {
    this.ofis.calisanAta(this);
  }

  abstract gorevYap(): void;
}

// Madde 3: Profesör (Generalization)
export class Profesor extends Calisan {
  constructor(
    adSoyad: string,
    sicilNo: string,
    ofis: CalismaOfisi,
    public unvan: string
  ) {
    super(adSoyad, sicilNo, ofis);
  }

  gorevYap(): void {
    console.log(\`\${this.unvan} \${this.adSoyad} ders veriyor ve makale yazıyor.\`);
  }
}

// Madde 3: Memur (Generalization)
export class Memur extends Calisan {
  constructor(
    adSoyad: string,
    sicilNo: string,
    ofis: CalismaOfisi,
    public birim: string
  ) {
    super(adSoyad, sicilNo, ofis);
  }

  gorevYap(): void {
    console.log(\`Memur \${this.adSoyad} (\${this.birim}) idari işlemleri sürdürüyor.\`);
  }
}

// Madde 1: Sınıflık
export class Siniflik {
  constructor(public kod: string, public kapasite: number) {}
}

// Madde 1 & 2: Departman
export class Departman {
  public ofisler: CalismaOfisi[] = [];

  constructor(public ad: string) {}

  ofisEkle(ofis: CalismaOfisi): void {
    this.ofisler.push(ofis);
  }
}

// Madde 1: Üniversite (Bileşim - Composition)
export class Universite {
  public sinifliklar: Siniflik[] = [];
  public departmanlar: Departman[] = [];
  public calismaOfisleri: CalismaOfisi[] = [];
  public calisanlar: Calisan[] = [];

  constructor(public ad: string) {}
}
`;
}
