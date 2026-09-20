# RuangBelajar AI

Chatbot tutor personal tersedia di `/ai-tutor`.

## Use case

RuangBelajar AI membantu pelajar Indonesia memahami pemrograman, matematika, bahasa Inggris, dan persiapan karier digital melalui percakapan natural.

## Parameter kreatif

- Pilihan domain belajar
- Gaya bahasa santai, formal, atau motivatif
- Kedalaman jawaban ringkas hingga mendalam
- Memory percakapan berbasis perangkat
- Rekomendasi prompt belajar
- Respons adaptif berdasarkan konteks percakapan

## Integrasi model

Endpoint `/api/ai-tutor` menggunakan OpenAI Responses API ketika `OPENAI_API_KEY` tersedia. Model default adalah `gpt-6-astra` dan dapat diganti melalui `OPENAI_MODEL`.

Tanpa kunci API, aplikasi otomatis memakai mode demo NLP lokal agar UI dan alur percakapan tetap dapat diuji.
