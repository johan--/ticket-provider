Fabricator(:ticket, class_name: 'Ticket') do
  row { (('A'..'Z').to_a << nil).sample }
  column { ((1..10).to_a << nil).sample }
  price { (500...10000).to_a.sample }
end