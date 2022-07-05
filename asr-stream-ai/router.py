from fastapi import APIRouter
from schema import Message
from config import loop, KAFKA_BOOTSTRAP_SERVERS, KAFKA_CONSUMER_GROUP, KAFKA_TOPIC
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
import json
from pykafka import KafkaClient
import torch
import torchaudio
# from datasets import load_dataset, load_metric, Audio
import re
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC, Wav2Vec2FeatureExtractor, Wav2Vec2CTCTokenizer
from torch.nn.functional import normalize
import array
from miniaudio import SampleFormat, decode
from pathlib import Path
from io import BytesIO

route = APIRouter()
# Load model
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

@route.post('/create_message')
async def send(message: Message):
    producer = AIOKafkaProducer(
        loop=loop, bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)
    await producer.start()
    try:
        print(f'Sendding message with value: {message}')
        value_json = json.dumps(message.__dict__).encode('utf-8')
        await producer.send_and_wait(topic=KAFKA_TOPIC, value=value_json)
    finally:
        await producer.stop()
@route.get('/hello')
async def hello():
    audio_waveform, sample_rate = torchaudio.load('./audio.wav')
    # print(audio_waveform)

    audio_bytes = Path('./audio.wav').read_bytes()
    print(buffer())
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
    return {"message": output}

async def consume():
    consumer = AIOKafkaConsumer(KAFKA_TOPIC, loop=loop,
                                bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS, group_id=KAFKA_CONSUMER_GROUP)
    await consumer.start()
    try:
        async for msg in consumer:
            # print(f'Consumer msg: {msg}')
            # audio_waveform, sample_rate = torchaudio.load('./audio.wav')
            # audio_bytes = Path('./audio.wav').read_bytes()
            # print(BytesIO(audio_bytes).read())
            # print(type(audio_bytes))
            # print(msg.value)
            # print(msg.value[0])
            # print(len(msg.value),msg.value[len(msg.value)-1])
            # print(len(audio_bytes),audio_bytes[len(audio_bytes)-1])



            # print(audio_bytes)
            decoded_audio = decode(msg.value, nchannels=1, sample_rate=16000, output_format=SampleFormat.SIGNED32)
            # print(decoded_audio.samples)
            decoded_audio = torch.FloatTensor(decoded_audio.samples)
            decoded_audio /= (1 << 31)
            # print("hello data",decoded_audio.squeeze().numpy())
            # print(normalize(torch.tensor(decoded_audio,dtype=torch.float32),p=2.0,dim=1))
            # t = torch.frombuffer(a, dtype=torch.int32)
            # print(bytearray(msg.value))
            # print(t)
            # print(msg.value.decode("utf-8").split(','))
            # torch_data = torch.frombuffer(msg.value.split(','),dtype=torch.int32)
            # hello = sys.argv[1].split(',')
            # hello = list(map(int,hello))

            # print(type(hello))
            # print(type(audio_waveform.squeeze().numpy()))
            # print(audio_waveform.squeeze().numpy())
            # data = normalize(torch.tensor(audio_waveform,dtype=torch.float32),p=2.0,dim=1)
            # print(type(data.squeeze().numpy()))

            # print(data.squeeze().numpy())
            # torch_data = torch.frombuffer(hello,dtype=torch.int32)
            # print(type(torch_data))
            # inputs = processor(audio_waveform.squeeze().numpy(), sampling_rate=sample_rate, return_tensors="pt", padding=True)
            inputs = processor(decoded_audio.squeeze().numpy(), sampling_rate=16000, return_tensors="pt", padding=True)
            with torch.no_grad():
                logits = model(inputs.input_values.to("cpu")).logits
                pred_ids = torch.argmax(logits, dim=-1)

                scores = torch.nn.functional.log_softmax(logits, dim=-1)
                # pred_scores = scores.gather(1, pred_ids.unsqueeze(-1))[:, :, 0]

                output = processor.batch_decode(pred_ids, output_word_offsets=False, output_char_offsets=False)
                print(output)
    finally:
        await consumer.stop()
