"""Gera public/Joao_Pedro_Moretti_CV.pdf.

Uso: pip install reportlab && python scripts/gerar_curriculo.py
Edite os dados abaixo e rode de novo para atualizar o PDF.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

SAIDA = Path(__file__).resolve().parent.parent / "public" / "Joao_Pedro_Moretti_CV.pdf"

# ---------------------------------------------------------------- dados

NOME = "João Pedro do Prado Moretti"
CARGO = "Desenvolvedor Full Stack"
# Cada lista vira uma linha no cabeçalho
CONTATOS = [
    [
        "São João da Boa Vista - SP",
        '<a href="tel:+5519994815851">(19) 99481-5851</a>',
        '<a href="mailto:m0rettyy20@gmail.com">m0rettyy20@gmail.com</a>',
    ],
    [
        '<a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-do-prado-moretti-891083227/">'
        "linkedin.com/in/joão-pedro-do-prado-moretti-891083227</a>",
        '<a href="https://github.com/Morettys2">github.com/Morettys2</a>',
        '<a href="https://morettys2.vercel.app">morettys2.vercel.app</a>',
    ],
]

RESUMO = (
    "Desenvolvedor Full Stack e estudante de Engenharia de Software. Gosto de "
    "entender o problema antes de escrever código e de entregar soluções simples, "
    "bem feitas e fáceis de manter. Sou curioso, aprendo rápido e estou sempre "
    "estudando novas tecnologias para evoluir como profissional."
)

EXPERIENCIAS = [
    {
        "cargo": "Desenvolvedor Full Stack",
        "empresa": "Unimed Leste Paulista",
        "periodo": "2026 – atual",
        "local": "São João da Boa Vista - SP",
        "itens": [
            "Desenvolvimento de novos portais web e manutenção dos portais existentes.",
            "Back-end com Node.js, NestJS e TypeScript; front-end com React e Next.js.",
            "Integração com banco de dados Oracle e escrita de consultas SQL.",
            "Versionamento de código e trabalho em equipe com Git/GitHub.",
        ],
    },
]

FORMACAO = [
    {
        "curso": "Bacharelado em Engenharia de Software",
        "instituicao": "UNIFAE",
        "periodo": "2024 – 2027 (em andamento)",
    },
]

COMPETENCIAS = [
    ("Linguagens", "TypeScript, JavaScript, Python, PHP, SQL"),
    ("Front-end", "React, Next.js, Tailwind CSS"),
    ("Back-end", "Node.js, NestJS"),
    ("Banco de dados", "Oracle, PostgreSQL, MySQL, SQL Server"),
    ("Ferramentas", "Git, GitHub, Docker, Postman"),
]

IDIOMAS = [
    ("Português", "nativo"),
    ("Inglês", "intermediário"),
]

# --------------------------------------------------------------- layout

TEXTO = HexColor("#1a1a1a")
SUAVE = HexColor("#555555")
LINHA = HexColor("#bbbbbb")

def estilo(nome, **kw):
    base = dict(fontName="Helvetica", fontSize=10, leading=13.5, textColor=TEXTO, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(nome, **base)

S_NOME = estilo("nome", fontName="Helvetica-Bold", fontSize=20, leading=24)
S_CARGO = estilo("cargo", fontSize=12, leading=16, textColor=SUAVE)
S_CONTATO = estilo("contato", fontSize=9, leading=12, textColor=SUAVE)
S_SECAO = estilo("secao", fontName="Helvetica-Bold", fontSize=11, leading=14, spaceBefore=10)
S_TITULO = estilo("titulo", fontName="Helvetica-Bold", fontSize=10.5)
S_META = estilo("meta", fontSize=9, textColor=SUAVE)
S_META_DIR = estilo("meta_dir", fontSize=9, textColor=SUAVE, alignment=2)
S_ITEM = estilo("item", leading=13)

# Largura útil do frame (margens de 18 mm + padding interno de 6 pt de cada lado)
LARGURA = A4[0] - 36 * mm - 12


def secao(titulo):
    return [
        Paragraph(titulo.upper(), S_SECAO),
        HRFlowable(width="100%", thickness=0.6, color=LINHA, spaceBefore=2, spaceAfter=6),
    ]


def linha_dupla(esq, dir, estilo_esq):
    t = Table(
        [[Paragraph(esq, estilo_esq), Paragraph(dir, S_META_DIR)]],
        colWidths=[LARGURA * 0.68, LARGURA * 0.32], hAlign="LEFT",
    )
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    return t


def marcadores(itens):
    return ListFlowable(
        [ListItem(Paragraph(i, S_ITEM), leftIndent=10) for i in itens],
        bulletType="bullet", start="•", leftIndent=10, bulletFontSize=8, spaceBefore=3,
    )


def montar():
    hist = [
        Paragraph(NOME, S_NOME),
        Paragraph(CARGO, S_CARGO),
        Spacer(1, 4),
    ]
    hist += [Paragraph("  ·  ".join(linha), S_CONTATO) for linha in CONTATOS]

    hist += secao("Resumo")
    hist.append(Paragraph(RESUMO, S_ITEM))

    hist += secao("Experiência")
    for i, e in enumerate(EXPERIENCIAS):
        bloco = [
            linha_dupla(f"{e['cargo']} — {e['empresa']}", e["periodo"], S_TITULO),
            Paragraph(e["local"], S_META),
            marcadores(e["itens"]),
        ]
        if i < len(EXPERIENCIAS) - 1:
            bloco.append(Spacer(1, 8))
        hist.append(KeepTogether(bloco))

    hist += secao("Formação")
    for f in FORMACAO:
        hist.append(linha_dupla(f"{f['curso']} — {f['instituicao']}", f["periodo"], S_TITULO))

    hist += secao("Competências técnicas")
    for rotulo, valor in COMPETENCIAS:
        hist.append(Paragraph(f"<b>{rotulo}:</b> {valor}", S_ITEM))

    hist += secao("Idiomas")
    hist.append(Paragraph("  ·  ".join(f"<b>{i}:</b> {n}" for i, n in IDIOMAS), S_ITEM))

    doc = SimpleDocTemplate(
        str(SAIDA), pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm, topMargin=16 * mm, bottomMargin=16 * mm,
        title=f"Currículo - {NOME}", author=NOME, subject=CARGO,
    )
    doc.build(hist)
    print(f"Gerado: {SAIDA}")


if __name__ == "__main__":
    montar()
