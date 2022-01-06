def suggest_medicine(disease):
    di = {
            'Diabetes ': ['Lucentis'],
            'Arthritis': ['Valdyn'],
            'Urinary tract infection': ['Vitravene', 'Vitrasert Implant'],
            'Cervical spondylosis': ['Gardasil', 'Silgard'],
            'Malaria': ['Eurartesim'],
            'Hepatitis C': ['Primavax'],
            'Hypertension ': ['INOmax'],
            'Alcoholic hepatitis': ['Primavax'],
            'Impetigo': ['Altargo'],
            'Peptic ulcer diseae': ['Regranex'],
            'Hepatitis E': ['Primavax'],
            'Fungal infection': ['Vitravene', 'Vitrasert Implant'],
            'Hepatitis B': ['Primavax'],
            'Drug Reaction': ['Ondexxya'],
            'Chicken pox': ['Imvanex'],
            'Bronchial Asthma': ['DuoResp Spiromax', 'BiResp Spiromax', 'Aerivio Spiromax', 'Airexar Spiromax', 'Budesonide/Formoterol Teva', 'Vylaer Spiromax'],
            'Tuberculosis': ['Granupas (previously Para-aminosalicylic acid Lucane)'],
            'Heart attack': ['Neparvis', 'Verquvo', 'Entresto', 'Reasanz'],
            'Psoriasis': ['Solymbic'],
            'Dengue': ['Dengvaxia'],
            'Migraine': ['Aimovig', 'Emgality', 'Ajovy', 'Sumatriptan Galpharm'],
            'Chronic cholestasis': ['Levviax'],
            'Pneumonia': ['Levviax'],
            'Hepatitis D': ['Primavax'],
            'hepatitis A': ['Primavax']
            }
    if disease in di:
        medicines = ', '.join(di[disease])
    else:
        medicines = 'consult a doctor for medicines'
    return medicines