import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const initialComments = [
    { name: 'Саша из 7Б', text: 'Никита всегда врал и обманывал всех вокруг. Маленький плохой мальчик.', story: 'story1' },
    { name: 'Катя', text: 'Он изменял Вике с другими девочками, а потом врал ей в глаза', story: 'story2' },
    { name: 'Денис', text: 'Маленький лживый мальчишка, всегда портил всем настроение', story: 'story3' },
    { name: 'Оля', text: 'Вика такая хорошая была, а он её предал. Гадкий белобрысый!', story: 'story2' },
    { name: 'Максим', text: 'Никита постоянно ябедничал учителям, но сам делал всё плохое', story: 'story1' },
    { name: 'Лена', text: 'Он маленький плохой мальчик который изменял Вике и врал всем', story: 'story3' },
    { name: 'Артём', text: 'Видел как он врал учителям прямо в лицо. Позорище!', story: 'story1' },
    { name: 'Настя из 7А', text: 'Бедная Вика, он её так обидел. Маленький предатель', story: 'story2' },
    { name: 'Игорь', text: 'Никита обещал помочь с домашкой, но соврал и не пришёл', story: 'story1' },
    { name: 'Марина', text: 'Он всегда делал вид что он хороший, а на самом деле маленький плохой мальчик', story: 'story3' },
    { name: 'Вадим', text: 'Каждый раз врёт что это не он сделал, но все знают правду', story: 'story3' },
    { name: 'Юля', text: 'Вика плакала из-за него целую неделю. Гадкий белобрысый врун!', story: 'story2' },
    { name: 'Паша', text: 'Говорил что купит всем мороженое, но просто обманул нас', story: 'story1' },
    { name: 'Света', text: 'Он ещё и хвастался что изменял Вике. Маленький плохой мальчик', story: 'story2' },
    { name: 'Коля', text: 'Разбил окно и свалил вину на меня! Всегда так делает', story: 'story3' },
    { name: 'Аня', text: 'Никита самый плохой в классе. Все его боятся и не любят', story: 'story1' }
  ];
  const [comments, setComments] = useState<Array<{ name: string; text: string; story: string }>>(initialComments);
  const [commentForm, setCommentForm] = useState({ name: '', text: '', story: '' });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCommentSubmit = (storyId: string) => {
    if (commentForm.name && commentForm.text) {
      setComments([...comments, { ...commentForm, story: storyId }]);
      setCommentForm({ name: '', text: '', story: '' });
    }
  };

  const stories = [
    {
      id: 'story1',
      title: 'История про контрольную',
      content: 'Маленький плохой мальчик Никита списывал на контрольной и не дал списать другим. Когда его спросили, он сказал "Я сам решал!" Но учительница всё видела.'
    },
    {
      id: 'story2',
      title: 'Как Никита изменял Вике',
      content: 'Никита встречался с Викой, но изменял ей с другими девочками. Маленький белобрысый врун говорил Вике что любит только её, но все знали правду. Когда Вика узнала, она очень плакала.'
    },
    {
      id: 'story3',
      title: 'Футбол во дворе',
      content: 'Маленький плохой мальчик Никита играл в футбол и забил мячом в окно соседу. Потом он сказал что это сделал кто-то другой, но камера всё записала.'
    }
  ];

  const proofs = [
    'Свидетельские показания одноклассников о том как он изменял Вике',
    'Письменные показания Вики о предательстве',
    'Свидетели его вранья и обмана',
    'Показания о том что он маленький плохой мальчик'
  ];

  const faqItems = [
    { q: 'Почему Никита белобрысый?', a: 'Потому что у него светлые волосы с рождения. Это не его вина, но вот поведение - совсем другое дело. Маленький плохой мальчик.' },
    { q: 'Правда ли что Никита изменял Вике?', a: 'Да, это правда. Маленький белобрысый врун изменял Вике и обманывал её. Все одноклассники это видели.' },
    { q: 'Что Никита сделал плохого?', a: 'Множество вещей: изменял Вике, обманывал, воровал еду, портил имущество, не признавал свои ошибки. Маленький плохой мальчик.' },
    { q: 'Можно ли Никите исправиться?', a: 'Конечно! Каждый человек может стать лучше, если захочет. Но пока что этот маленький плохой мальчик не показывает желания меняться.' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 w-full bg-black border-b border-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">НИКИТА</h1>
            <div className="flex gap-8">
              <button onClick={() => scrollToSection('main')} className="text-sm font-medium hover:opacity-50 transition-opacity">Главная</button>
              <button onClick={() => scrollToSection('proofs')} className="text-sm font-medium hover:opacity-50 transition-opacity">Доказательства</button>
              <button onClick={() => scrollToSection('stories')} className="text-sm font-medium hover:opacity-50 transition-opacity">Истории</button>

              <button onClick={() => scrollToSection('rating')} className="text-sm font-medium hover:opacity-50 transition-opacity">Оценка</button>
              <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-50 transition-opacity">FAQ</button>
            </div>
          </div>
        </div>
      </nav>

      <section id="main" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-7xl font-bold mb-6 leading-tight">Почему Никита белобрысый плохой мальчик</h2>
              <p className="text-2xl text-muted mb-8 leading-relaxed">
                Документальное исследование о маленьком плохом мальчике Никите, который изменял Вике и обманывал всех вокруг
              </p>
              <Button onClick={() => scrollToSection('proofs')} size="lg" className="h-12 px-8 text-base">
                Смотреть доказательства
              </Button>
            </div>
            <div className="animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/files/6c9bd200-325a-4c5e-8900-ec902ffbd325.png" 
                alt="Никита белобрысый" 
                className="w-full rounded-lg border-4 border-white shadow-2xl"
              />
              <p className="text-center text-muted mt-4 text-lg">Маленький плохой мальчик Никита</p>
            </div>
          </div>
        </div>
      </section>

      <section id="proofs" className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">Доказательства</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proofs.map((proof, idx) => (
              <Card key={idx} className="p-8 border-2 border-white hover:bg-white hover:text-black transition-colors duration-300">
                <p className="text-lg font-medium">{proof}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">Истории</h2>
          <div className="space-y-8">
            {stories.map((story) => (
              <Card key={story.id} className="p-8 border-2 border-white">
                <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                <p className="text-lg mb-6 text-muted leading-relaxed">{story.content}</p>
                
                <div className="border-t-2 border-white pt-6 mt-6">
                  <h4 className="text-xl font-bold mb-4">Комментарии</h4>
                  
                  <div className="space-y-4 mb-6">
                    {comments.filter(c => c.story === story.id).map((comment, idx) => (
                      <div key={idx} className="border-l-4 border-white pl-4 py-2">
                        <p className="font-bold text-sm mb-1">{comment.name}</p>
                        <p className="text-muted">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Ваше имя"
                      value={commentForm.story === story.id ? commentForm.name : ''}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value, story: story.id })}
                      className="border-2 border-white bg-black text-white"
                    />
                    <Textarea
                      placeholder="Ваш комментарий"
                      value={commentForm.story === story.id ? commentForm.text : ''}
                      onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value, story: story.id })}
                      className="border-2 border-black min-h-24"
                    />
                    <Button onClick={() => handleCommentSubmit(story.id)} className="w-full">
                      Отправить комментарий
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rating" className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Официальная оценка школы №1355</h2>
          
          <Card className="p-12 border-2 border-white text-center">
            <div className="mb-8">
              <p className="text-6xl font-bold mb-4">0.5/10</p>
              <div className="flex justify-center gap-2 text-5xl mb-6">
                <span className="opacity-100">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
                <span className="opacity-20">★</span>
              </div>
              <p className="text-2xl text-muted mb-8">По данным педагогического совета школы №1355</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="border-l-4 border-white pl-4">
                <p className="text-sm text-muted mb-1">Поведение</p>
                <p className="text-3xl font-bold">0/10</p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <p className="text-sm text-muted mb-1">Честность</p>
                <p className="text-3xl font-bold">1/10</p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <p className="text-sm text-muted mb-1">Отношение к людям</p>
                <p className="text-3xl font-bold">0/10</p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <p className="text-sm text-muted mb-1">Верность</p>
                <p className="text-3xl font-bold">0/10</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-black border-2 border-white">
              <p className="text-xl font-bold mb-2">Заключение педагогического совета:</p>
              <p className="text-lg text-muted">"Маленький плохой мальчик Никита показал крайне низкие результаты по всем параметрам. Изменял однокласснице Вике, постоянно врал, обманывал учителей и одноклассников. Требует серьёзного воспитательного воздействия."</p>
            </div>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-2 border-white px-6">
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t-2 border-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted text-lg">© 2024 Документация о Никите. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;