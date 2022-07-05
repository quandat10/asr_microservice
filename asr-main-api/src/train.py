import torch
import torchaudio
# from datasets import load_dataset, load_metric, Audio
import re
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC, Wav2Vec2FeatureExtractor, Wav2Vec2CTCTokenizer
from torch.nn.functional import normalize
import sys 

tokenizer = Wav2Vec2CTCTokenizer("./pretrain915_finetune2/vocab.json", unk_token="[UNK]", pad_token="[PAD]", word_delimiter_token="|")
feature_extractor = Wav2Vec2FeatureExtractor(feature_size=1, sampling_rate=16000, padding_value=0.0, do_normalize=True, return_attention_mask=True)
processor = Wav2Vec2Processor(feature_extractor=feature_extractor, tokenizer=tokenizer)
model = Wav2Vec2ForCTC.from_pretrained(
    "./pretrain915_finetune2",
    attention_dropout=0.1,
    hidden_dropout=0.1,
    feat_proj_dropout=0.1,
    final_dropout=0.1,
    mask_time_prob=0.05,
    layerdrop=0.1,
    # gradient_checkpointing=True,
    ctc_loss_reduction="mean",
    ctc_zero_infinity=True,
    pad_token_id=processor.tokenizer.pad_token_id,
    vocab_size=len(processor.tokenizer)
).to('cpu')

audio_waveform, sample_rate = torchaudio.load('./audio.wav')
# print(sys.argv[1])
# print(sample_rate)
# hello = sys.argv[1].split(',')
# hello = list(map(int,hello))

# print(type(hello))
# print(type(audio_waveform.squeeze().numpy()))
# print(audio_waveform.squeeze().numpy())
data = normalize(torch.tensor(audio_waveform,dtype=torch.float32),p=2.0,dim=1)
# print(type(data.squeeze().numpy()))

print(data.squeeze().numpy())
# torch_data = torch.frombuffer(hello,dtype=torch.int32)
# print(type(torch_data))
# inputs = processor(audio_waveform.squeeze().numpy(), sampling_rate=sample_rate, return_tensors="pt", padding=True)
inputs = processor(data.squeeze().numpy(), sampling_rate=sample_rate, return_tensors="pt", padding=True)

with torch.no_grad():
  logits = model(inputs.input_values.to("cpu")).logits
pred_ids = torch.argmax(logits, dim=-1)

scores = torch.nn.functional.log_softmax(logits, dim=-1)
# pred_scores = scores.gather(1, pred_ids.unsqueeze(-1))[:, :, 0]

output = processor.batch_decode(pred_ids, output_word_offsets=False, output_char_offsets=False)
print(output)