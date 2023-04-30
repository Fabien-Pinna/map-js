const publicLandfill = [
    {
        ID: '01',
        COLOR: '#21a548',
        COORDINATES: [4.944252730757171, 44.3629876944604],
        NAME: 'Déchèterie de Valréas',
        ADDRESS: "Chemin de l'Oulle 84600 VALREAS",
        PHONE: '04 90 35 01 52',
        WEBSITE: 'http://cceppg.fr',
        DESCRIPTION:
            "Carte réalisable à la déchèterie directement. Prévoir un justificatif d'activité et un justificatif de siège social sur la communauté de communes Enclave des Papes-Pays de Grignan.",
        HOURS_MORNING: [
            '8h30 - 12h',
            '8h30 - 12h',
            '8h30 - 12h',
            '7h30 - 13h15',
            '8h30 - 12h',
            '8h30 - 12h',
            'X',
        ],
        HOURS_AFTERNOON: [
            '14h - 18h',
            '14h - 18h',
            '14h - 18h',
            '14h - 18h',
            '14h - 18h',
            '14h - 18h',
            'X',
        ],
        HOURS_SUMMER: [
            '7h30 - 13h15',
            '7h30 - 13h15',
            '7h30 - 13h15',
            '7h30 - 13h15',
            '7h30 - 13h15',
            '7h30 - 13h15',
            'X',
        ],
        AUTHORIZED_WASTE: [
            'Bois',
            'Cartons',
            'Déchets verts',
            'Encombrants',
            'Ferrailles',
            'Gravats',
            'Piles',
        ],
        FORBIDDEN_WASTE: [
            'Accumulateurs',
            'Boues des stations d’épuration',
            'Bouteilles de gaz',
            'Cadavres d’animaux',
            'Cendres',
            'Déchets amiantés',
            'Déchets d’abattoirs',
            'Déchets d’activités de soins',
            'Déchets industriels',
            'Déchets putrescibles',
            'Eléments mécaniques de véhicule',
            'Extincteurs',
            'Gravats en quantité importante des professionnels',
            'Médicaments',
            'Ordures ménagères',
            'Pneumatiques poids lourds',
            'Produits instables',
        ],
    },
    {
        ID: '02',
        COLOR: '#21a548',
        COORDINATES: [4.73739, 44.30538493999541],
        NAME: 'Déchèterie de Bollène',
        ADDRESS: 'Rd243 Z.I Les Sactars 84500 BOLLENE',
        PHONE: '04 90 40 22 40',
        WEBSITE: 'https://ccrlp.fr',
        DESCRIPTION: "Présenter une pièce d'identité et un extrait de Kbis.",
        HOURS_MORNING: [
            '8h30 - 12h',
            '8h30 - 12h',
            '8h30 - 12h',
            '8h30 - 12h',
            '8h30 - 12h',
            '8h30 - 12h',
            'X',
        ],
        HOURS_AFTERNOON: [
            '13h30 - 17h',
            '13h30 - 17h',
            '13h30 - 17h',
            '13h30 - 17h',
            '13h30 - 17h',
            '13h30 - 17h',
            'X',
        ],
        HOURS_SUMMER: null,
        AUTHORIZED_WASTE: [
            'Accumulateurs',
            'Appareils électroménagers',
            'Batteries',
            'Bois',
            'Cartons',
            'DDM',
            'DEEE',
            'Déchets verts',
            'Ecrans',
            'Gravats',
            'Huiles de fritures',
            'Huiles de vidange',
            'Métaux',
            'Piles',
            'Pneus',
            'Tout venant',
        ],
        FORBIDDEN_WASTE: ['Ampoules', 'Déchets non cités'],
    },
]
export default publicLandfill
